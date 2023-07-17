// const https = require('https');
const fs = require('fs'); //파일처리모듈
const express = require('express');
const app = express();
const cors = require('cors');
const port = 4999;

app.use(express.json());
app.use(cors());

fs.mkdir('uploads', (err)=>console.log(err));

const guestbookRouter = require('./guestbook');

app.use('/guestbook', guestbookRouter);

app.listen(port, ()=>{
    console.log(`HTTP Server is starting on ${port}`);
})

// https.createServer(
//     {
//         key: fs.readFileSync(__dirname+'/../key.pem','utf-8'),
//         cert: fs.readFileSync(__dirname+'/../cert.pem','utf-8')
//     },
//     app
// ).listen(port, () => {
//     console.log(`app listening on port ${port}`)
// });