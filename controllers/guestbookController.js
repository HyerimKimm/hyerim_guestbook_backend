const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sue05124:TKA7xskmHsubSXi9@cluster0.has0vkc.mongodb.net/?retryWrites=true&w=majority";

async function findAllGuestbook() {
    const client = await MongoClient.connect(uri);
    let db = await client.db('hyerim_guestbook');
    let 전체데이터 = await db.collection('guestbook').find({}).toArray();
    return 전체데이터;
}

//방명록 데이터 1개 추가 메소드
async function insertIntoGuestbook({name,content,profileImage}) {
    const client = await MongoClient.connect(uri);
    let db = await client.db('hyerim_guestbook');
    try{
        let today = new Date();
        let year = today.getFullYear();
        let month = ('0' + (today.getMonth() + 1)).slice(-2);
        let day = ('0' + today.getDate()).slice(-2);
    
        await db.collection('guestbook').insertOne({
            name: name,
            content: content,
            addDate: `${year}-${month}-${day}`,
            profileImage: profileImage
        })
        //정상 등록 시 등록일자 return
        return `${year}-${month}-${day}`;
    } catch(e) {
        console.log(e);
    }
}

module.exports = {
    findAll: async (req, res) => {
        let responseData = await findAllGuestbook();
        res.status(200).send({ data:responseData });
    },
    postContent: async (req, res, next) => {
        let responseData = await insertIntoGuestbook;
        res.status(200).send({ data:responseData });
    }
};