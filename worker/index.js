/**
 * ═══════════════════════════════════════════════════
 *  LETS English — Review Feedback Worker
 *  Cloudflare Worker with structured logging
 *  Version: 1.2.0
 * ═══════════════════════════════════════════════════
 */

const WORKER_VERSION = '1.2.0';
const startTime = Date.now();

export default {
  async fetch(request, env) {
    const requestId = crypto.randomUUID().split('-')[0]; // Short request ID
    const t0 = Date.now();
    const url = new URL(request.url);
    const method = request.method;
    const path = url.pathname;

    // ── Structured request log ──
    console.log(`[${requestId}] → ${method} ${path}`);

    // ── CORS ──
    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }

    try {
      let response;

      // ── Route matching ──
      if (path === '/upload' && method === 'POST') {
        response = await handleUpload(request, env, requestId);
      } else if (path === '/list' && method === 'GET') {
        response = await handleList(env, requestId);
      } else if (path === '/delete-all' && method === 'DELETE') {
        response = await handleDeleteAll(env, requestId);
      } else if (path.startsWith('/delete/') && method === 'DELETE') {
        const id = path.replace('/delete/', '');
        response = await handleDeleteOne(id, env, requestId);
      } else if (path.startsWith('/image/') && method === 'GET') {
        response = await handleGetImage(path, env, requestId);

      } else if (path === '/health' && method === 'GET') {
        response = await handleHealth(env, requestId);
      } else if (path === '/debug/info' && method === 'GET') {
        response = handleDebugInfo(requestId);
      } else {
        response = jsonResponse({ error: 'Not found' }, 404, requestId);
      }

      // ── Response log ──
      const duration = Date.now() - t0;
      console.log(`[${requestId}] ← ${response.status} (${duration}ms)`);

      return response;
    } catch (err) {
      const duration = Date.now() - t0;
      console.error(`[${requestId}] ✗ UNHANDLED ERROR (${duration}ms):`, err.message, err.stack);
      return jsonResponse({ error: 'Internal server error', requestId }, 500, requestId);
    }
  },
};

// ═══════════════════════════════════════════════════
//  Route Handlers
// ═══════════════════════════════════════════════════

// ── Handle Upload ──
async function handleUpload(request, env, rid) {
  try {
    const formData = await request.formData();

    const imageFile = formData.get('image');
    const comment = formData.get('comment') || '';
    const pageUrl = formData.get('page_url') || '';
    const selectedArea = formData.get('selected_area') || '{}';
    const timestamp = formData.get('timestamp') || new Date().toISOString();
    const userAgent = formData.get('user_agent') || '';
    const role = formData.get('role') || 'Unknown';

    if (!imageFile) {
      console.warn(`[${rid}] Upload missing image file`);
      return jsonResponse({ error: 'Missing image file' }, 400, rid);
    }

    // Generate unique key
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const id = crypto.randomUUID();
    const imageKey = `feedback/${date}/${id}.png`;
    const metaKey = `feedback/${date}/${id}.json`;

    console.log(`[${rid}] Uploading: id=${id}, role=${role}, comment="${comment.substring(0, 50)}..."`);

    // Upload image to R2
    const imageBuffer = await imageFile.arrayBuffer();
    await env.R2_BUCKET.put(imageKey, imageBuffer, {
      httpMetadata: { contentType: 'image/png' },
      customMetadata: { comment: comment.substring(0, 200) },
    });

    // Parse selected area safely
    let parsedArea = {};
    try {
      parsedArea = JSON.parse(selectedArea);
    } catch (e) {
      console.warn(`[${rid}] Invalid selected_area JSON: ${e.message}`);
    }

    // Create and upload metadata JSON
    const metadata = {
      id,
      comment,
      page_url: pageUrl,
      selected_area: parsedArea,
      timestamp,
      user_agent: userAgent,
      role,
      image_key: imageKey,
      created_at: new Date().toISOString(),
    };

    await env.R2_BUCKET.put(metaKey, JSON.stringify(metadata, null, 2), {
      httpMetadata: { contentType: 'application/json' },
    });

    console.log(`[${rid}] Upload success: imageKey=${imageKey}, size=${(imageBuffer.byteLength / 1024).toFixed(1)}KB`);

    return jsonResponse({ success: true, id, imageKey, metaKey }, 200, rid);
  } catch (err) {
    console.error(`[${rid}] Upload error:`, err.message, err.stack);
    return jsonResponse({ error: 'Upload failed: ' + err.message }, 500, rid);
  }
}

// ── Handle List (last 50 feedback items) ──
async function handleList(env, rid) {
  try {
    const listed = await env.R2_BUCKET.list({
      prefix: 'feedback/',
      limit: 100,
    });

    // Filter only .json metadata files
    const items = listed.objects
      .filter((obj) => obj.key.endsWith('.json'))
      .sort((a, b) => new Date(b.uploaded) - new Date(a.uploaded))
      .slice(0, 50);

    console.log(`[${rid}] Listing: ${items.length} feedback items found`);

    // Read each metadata file
    const feedbacks = [];
    for (const item of items) {
      const obj = await env.R2_BUCKET.get(item.key);
      if (obj) {
        const data = await obj.json();
        feedbacks.push(data);
      }
    }

    return jsonResponse({ success: true, feedbacks }, 200, rid);
  } catch (err) {
    console.error(`[${rid}] List error:`, err.message);
    return jsonResponse({ error: 'List failed: ' + err.message }, 500, rid);
  }
}

// ── Handle Delete All ──
async function handleDeleteAll(env, rid) {
  try {
    let deleted = 0;
    let cursor;
    do {
      const listed = await env.R2_BUCKET.list({ prefix: 'feedback/', limit: 100, cursor });
      for (const obj of listed.objects) {
        await env.R2_BUCKET.delete(obj.key);
        deleted++;
      }
      cursor = listed.truncated ? listed.cursor : null;
    } while (cursor);

    console.log(`[${rid}] Delete all: ${deleted} objects deleted`);
    return jsonResponse({ success: true, deleted }, 200, rid);
  } catch (err) {
    console.error(`[${rid}] Delete all error:`, err.message);
    return jsonResponse({ error: 'Delete failed: ' + err.message }, 500, rid);
  }
}

// ── Handle Delete One ──
async function handleDeleteOne(id, env, rid) {
  try {
    if (!id) return jsonResponse({ error: 'Missing id' }, 400, rid);

    console.log(`[${rid}] Deleting feedback: ${id}`);
    let deleted = 0;
    let cursor;
    do {
      const listed = await env.R2_BUCKET.list({ prefix: 'feedback/', limit: 100, cursor });
      for (const obj of listed.objects) {
        // Match files like feedback/2026-03-07/<id>.json or <id>.png
        if (obj.key.includes(id)) {
          await env.R2_BUCKET.delete(obj.key);
          deleted++;
        }
      }
      cursor = listed.truncated ? listed.cursor : null;
    } while (cursor);

    if (deleted === 0) {
      console.warn(`[${rid}] Feedback not found: ${id}`);
      return jsonResponse({ error: 'Feedback not found' }, 404, rid);
    }
    console.log(`[${rid}] Deleted ${deleted} objects for id=${id}`);
    return jsonResponse({ success: true, id, deleted }, 200, rid);
  } catch (err) {
    console.error(`[${rid}] Delete error:`, err.message);
    return jsonResponse({ error: 'Delete failed: ' + err.message }, 500, rid);
  }
}

// ── Handle Get Image ──
async function handleGetImage(pathname, env, rid) {
  try {
    // pathname: /image/feedback/2026-03-07/uuid.png
    const key = pathname.replace('/image/', '');
    const obj = await env.R2_BUCKET.get(key);
    if (!obj) {
      console.warn(`[${rid}] Image not found: ${key}`);
      return jsonResponse({ error: 'Image not found' }, 404, rid);
    }
    return new Response(obj.body, {
      headers: {
        'Content-Type': obj.httpMetadata?.contentType || 'image/png',
        'Cache-Control': 'public, max-age=86400',
        'X-Request-Id': rid,
        ...corsHeaders(),
      },
    });
  } catch (err) {
    console.error(`[${rid}] Get image error:`, err.message);
    return jsonResponse({ error: 'Get image failed: ' + err.message }, 500, rid);
  }
}



// ═══════════════════════════════════════════════════
//  Debug / Health Endpoints
// ═══════════════════════════════════════════════════

// ── Health Check ──
async function handleHealth(env, rid) {
  try {
    // Check R2 connection
    let r2Status = 'unknown';
    try {
      await env.R2_BUCKET.list({ prefix: 'feedback/', limit: 1 });
      r2Status = 'connected';
    } catch (e) {
      r2Status = 'error: ' + e.message;
    }

    console.log(`[${rid}] Health check: R2=${r2Status}`);

    return jsonResponse({
      status: 'healthy',
      version: WORKER_VERSION,
      uptime: Math.floor((Date.now() - startTime) / 1000) + 's',
      services: {
        r2: r2Status,
      },
      timestamp: new Date().toISOString(),
    }, 200, rid);
  } catch (err) {
    return jsonResponse({ status: 'unhealthy', error: err.message }, 500, rid);
  }
}

// ── Debug Info ──
function handleDebugInfo(rid) {
  return jsonResponse({
    version: WORKER_VERSION,
    runtime: 'Cloudflare Workers',
    requestId: rid,
    timestamp: new Date().toISOString(),
    uptime: Math.floor((Date.now() - startTime) / 1000) + 's',
  }, 200, rid);
}

// ═══════════════════════════════════════════════════
//  Helpers
// ═══════════════════════════════════════════════════

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function jsonResponse(data, status = 200, requestId = '') {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'X-Request-Id': requestId,
      'X-Worker-Version': WORKER_VERSION,
      ...corsHeaders(),
    },
  });
}
