require('dotenv').config()

const express = require('express');
const fs = require('fs')
const bodyParser = require('body-parser');
const https = require('https');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(__dirname + '/pages/index.html'))
app.get('/gallery', (req,res) => res.sendFile(__dirname + '/pages/gallery.html'))
app.get('/music', (req,res) => res.sendFile(__dirname + '/pages/music.html'))
app.get('/quotes', (req,res) => res.sendFile(__dirname + '/pages/quotes.html'))
app.get('*', (req,res) => res.sendFile(__dirname + '/pages/notfound.html'))

https.createServer({
	key: fs.readFileSync(process.env.KEY),
	cert: fs.readFileSync(process.env.CERT)
}, app)
.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))
