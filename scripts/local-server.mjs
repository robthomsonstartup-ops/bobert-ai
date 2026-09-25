import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.PORT || 3000);
const GOOGLE_KEY = process.env.GOOGLE_API_KEY || '';
const MIME = { '.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml' };

function send(res, status, body, type='application/json') { res.writeHead(status, {'Content-Type': type, 'Access-Control-Allow-Origin':'*'}); res.end(body); }
async function readBody(req) { const chunks=[]; for await (const c of req) chunks.push(c); return Buffer.concat(chunks).toString(); }

const server = http.createServer(async (req,res) => {
  try {
    if (req.method === 'OPTIONS') return send(res,204,'');
    if (req.url === '/api/intake-ocr.js' && req.method === 'POST') {
      if (!GOOGLE_KEY) return send(res,500,JSON.stringify({error:'GOOGLE_API_KEY is not configured. Set it in Terminal before starting Bobert.'}));
      const body = JSON.parse(await readBody(req));
      if (!body.image) return send(res,400,JSON.stringify({error:'No image provided'}));
      const b64 = body.image.replace(/^data:image\/\w+;base64,/,'');
      const r = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_KEY}`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({requests:[{image:{content:b64},features:[{type:'TEXT_DETECTION',maxResults:1},{type:'LOGO_DETECTION',maxResults:10}]}]})});
      const data = await r.json();
      if (data.error) return send(res,502,JSON.stringify({error:data.error.message || 'Vision API error'}));
      const response=data?.responses?.[0]||{};
      const rawText=response?.fullTextAnnotation?.text||'';
      const logos=(response?.logoAnnotations||[]).filter(x=>x.score>0.5).map(x=>x.description);
      const parts=[];
      if(logos.length) parts.push(`Companies/logos detected: ${logos.join(', ')}`);
      if(rawText.trim()) parts.push(rawText.trim());
      return send(res,200,JSON.stringify({text:parts.join('\n\n') || '(No text detected in image)'}));
    }

    let pathname = decodeURIComponent((req.url || '/').split('?')[0]);
    if (pathname === '/') pathname='/sales-os.html';
    const filePath = path.resolve(ROOT, '.' + pathname);
    if (!filePath.startsWith(ROOT + path.sep) && filePath !== ROOT) return send(res,403,JSON.stringify({error:'Forbidden'}));
    const data=await fs.readFile(filePath);
    send(res,200,data,MIME[path.extname(filePath)]||'application/octet-stream');
  } catch (err) {
    if (err.code==='ENOENT') return send(res,404,JSON.stringify({error:'Not found'}));
    console.error(err);
    return send(res,500,JSON.stringify({error:err.message}));
  }
});

server.listen(PORT,()=>console.log(`Bobert Sales OS running at http://localhost:${PORT}/sales-os.html`));
