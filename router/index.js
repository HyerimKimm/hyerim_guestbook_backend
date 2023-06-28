const express = require('express');
const app = express();
const cors = require('cors');
const port = 4999;

app.use(express.json());
app.use(cors());

const guestbookRouter = require('./guestbook');

app.use('/guestbook', guestbookRouter)

app.get('/', (req, res)=>{
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})