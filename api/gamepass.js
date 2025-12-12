const https = require('https');

module.exports = (req, res) => {
  const { query } = req;
  let { id } = query || {};

  if (!id) {
    const match = req.url.match(/\/api\/gamepass\/(\d+)/);
    if (match) id = match[1];
  }

  if (!id || !/^\d+$/.test(String(id))) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Invalid gamepass id' }));
    return;
  }

  const cookie = process.env.ROBLOSECURITY;
  if (!cookie) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Server not configured: missing ROBLOSECURITY secret' }));
    return;
  }

  const apiUrl = `https://apis.roblox.com/game-passes/v1/game-passes/${id}/details`;
  const options = {
    headers: {
      'Cookie': `.ROBLOSECURITY=${cookie}`,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'application/json'
    }
  };

  https.get(apiUrl, options, (apiRes) => {
    let data = '';
    apiRes.on('data', (chunk) => { data += chunk; });
    apiRes.on('end', () => {
      res.statusCode = apiRes.statusCode || 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(data);
    });
  }).on('error', (err) => {
    res.statusCode = 502;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: err.message }));
  });
};