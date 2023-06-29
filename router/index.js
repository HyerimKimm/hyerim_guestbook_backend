const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 4999;

app.use(express.json());
app.use(cors());

const guestbookRouter = require('./guestbook');

app.use('/guestbook', guestbookRouter)

https.createServer(
    {
        key: fs.readFileSync(__dirname+'/../key.pem','utf-8'),
        cert: fs.readFileSync(__dirname+'/../cert.pem','utf-8')
    },
    app
).listen(port, () => {
    console.log(`app listening on port ${port}`)
});