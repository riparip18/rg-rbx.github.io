const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // API endpoint
    if (req.url.startsWith('/api/gamepass/')) {
        const gamepassId = req.url.split('/api/gamepass/')[1];
        
        // Updated cookie
        const cookie = '_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_CAEaAhADIhwKBGR1aWQSFDE0MTk4NjQxODcxMzE5MDE1ODY4KAM.qekWv69IDwgwyKOmpQzWkHl0OSmycYKPJ_Vx3k1mOeHsZ1IUVzPMxzyIQa5ChKXLNRr9VL3F6q8KIjyh3vZG3Z7Tq-hnrL7TQCOg9wROy3qcZ6ZKl28Tj35qPZHDrZ6m1qL0a8U9dKbtpxB07J1VuQr_rezLcmxwY4ieqb4jV6__47VKn60mxh9PeCJDzFH9RH4MBdLDQuiZAPl2_wHEOxnUAVwViEZhEPLXrp_ARBSG9z7GGJ9Ea96mU8puACwFgyrlN1KXSoamAk_c_Pt7y9-0QwlOZ-1Age78quywr-1guwEPCjcswVmqut9yg6aaYdESkvn2_Tby2QnAfZDBoHCZMRzn0ssOwKvXNUh7tiT02MAAG36TMiZCzih1qRtjUVXAwJBye6hoA2QMH_YOFhpS5l8b-LRZCWAeDp-mK3pXFvw0355BNLlrG_bOk8D-Vyip8Gc85mSqqBavoQMGsHqJGbx9S01zWSzEJNmdL7MX9TCFJFTtXr2GbGqf-ZqzVLoQsHARnYs8raXaJWdzrAyaHBKe_-Xc7azwH9xhGEKGTQBP68ckqzWLzWMNWurSIdPorxoZy1GGtPSw5C7y4fKedwXX5nlvhG-Cmy7s1DIZXZM7Sa9LBW3yf_IRAiVIR4nmfJexffqPXM5oy3gw0yhnHJFWPHtwYYYGA209ABcETVbGjge4vmFt-FGRJlT9SXi1Y5ZZ4VI4bNIcxiK1xsVQbRkN-4Rf9UaIP1SX-pmyLqal6M_TaK7omX3LQjMkh7XeFsP7KdrG3rHrU5WKfdCrQ3Y';
        
        const apiUrl = `https://apis.roblox.com/game-passes/v1/game-passes/${gamepassId}/details`;
        
        const options = {
            headers: {
                'Cookie': `.ROBLOSECURITY=${cookie}`,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/json'
            }
        };
        
        https.get(apiUrl, options, (apiRes) => {
            let data = '';
            
            apiRes.on('data', (chunk) => {
                data += chunk;
            });
            
            apiRes.on('end', () => {
                res.writeHead(apiRes.statusCode, { 'Content-Type': 'application/json' });
                res.end(data);
            });
        }).on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        });
        
        return;
    }

    // Serve static files
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n✅ Server running at http://localhost:${PORT}/\n`);
});
