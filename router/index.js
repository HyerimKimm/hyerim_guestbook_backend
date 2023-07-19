const express = require('express');
const app = express();
const cors = require('cors');
const port = 4999;

const guestbookRouter = require('./guestbook')

app.use(express.json());
app.use(cors());
app.use('/guestbook',guestbookRouter)


app.listen(port, ()=>{
    console.log(`HTTP Server is starting on ${port}`);
})