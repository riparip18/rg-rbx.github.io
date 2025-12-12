const https = require('https');

exports.handler = async (event) => {
  const id = (event.queryStringParameters && event.queryStringParameters.id) || '';
  if (!id || !/^\d+$/.test(id)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid gamepass id' }) };
  }

  const cookie = process.env.ROBLOSECURITY || '';
  if (!cookie) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Server not configured: missing ROBLOSECURITY secret' }) };
  }

  const url = `https://apis.roblox.com/game-passes/v1/game-passes/${id}/details`;

  const options = {
    headers: {
      'Cookie': `.ROBLOSECURITY=${cookie}`,
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  };

  try {
    const data = await new Promise((resolve, reject) => {
      https.get(url, options, (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(body);
          } else {
            reject(new Error(`Roblox API error ${res.statusCode}: ${body}`));
          }
        });
      }).on('error', reject);
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: data,
    };
  } catch (err) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: 'Failed to fetch from Roblox API', details: err.message })
    };
  }
};
