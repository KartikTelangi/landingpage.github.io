const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    let filePath;

    if (req.url === '/' || req.url === '') {
        if (req.method === 'GET') {
            filePath = path.join(__dirname, 'index.html');
            console.log(`FilePath for /: ${filePath}`);
        } else if (req.method === 'POST') {
            let body = '';

            req.on('data', chunk => {
                body += chunk.toString(); // Convert Buffer to string
            });

            req.on('end', () => {
                const parsedBody = querystring.parse(body);
                console.log('Form data submitted:', parsedBody);

                // Here you can process the form data (e.g., send it somewhere or save it)
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end('<h1>Form submitted successfully!</h1>');
            });
            return;
        }
    } else if (req.url === '/style.css') {
        filePath = path.join(__dirname, 'style.css');
    } else if (req.url === '/script.js') {
        filePath = path.join(__dirname, 'script.js');
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>404 Not Found</h1>');
        return;
    }

    if (filePath) {
        fs.exists(filePath, (exists) => {
            if (!exists) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end('<h1>404 Not Found</h1>');
                return;
            }

            fs.readFile(filePath, (err, content) => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/html'});
                    res.end('<h1>500 Server Error</h1>');
                } else {
                    let contentType;
                    const ext = path.extname(filePath).substring(1);

                    switch (ext) {
                        case 'html':
                            contentType = 'text/html';
                            break;
                        case 'css':
                            contentType = 'text/css';
                            break;
                        case 'js':
                            contentType = 'application/javascript';
                            break;
                        default:
                            contentType = `text/${ext}`;
                    }

                    res.writeHead(200, {'Content-Type': contentType});
                    res.end(content);
                }
            });
        });
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
