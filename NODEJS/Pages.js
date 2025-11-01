
// lecture directory: NODEJS
import fs from 'fs/promises';
const directory = __dirname.replace(/\\/g, '/');
    
const filePath = `${directory}/${pageName}.html`;
    if (filePath === '/') {
        filePath = `${directory}/home.html`;
    }
    else if (filePath === '/about') {
        filePath = `${directory}/about.html`;
    }
     else {
        filePath = `${directory}/404.html`;
    }

    fs.readFile(filePath)
        .then((data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
        )
        .catch((err) => {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        }
        );


