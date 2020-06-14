require('dotenv').config()

const express = require('express');
const fs = require('fs')
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(__dirname + '/pages/index.html'))
app.get('/gallery', (req,res) => res.sendFile(__dirname + '/pages/gallery.html'));
app.get('/music', (req,res) => res.sendFile(__dirname + '/pages/music.html'));
app.get('/quotes', (req,res) => res.sendFile(__dirname + '/pages/quotes.html'));
app.get('*', (req,res) => res.sendFile(__dirname + '/pages/notfound.html'));

https.createServer({
	key: fs.readFileSync(process.env.KEY),
	cert: fs.readFileSync(process.env.CERT)
}, app)
.listen(process.env.PORT, () => console.log(`Server.js listening on port ${process.env.PORT}`));

const httpApp = express();
httpApp.get('*', (req, res) => res.redirect('https://' + req.headers.host + req.url));
const httpServer = http.createServer(httpApp);
httpServer.listen(80, () => console.log('HTTP server listening: http://jasperty.net'))
