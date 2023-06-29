const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sue05124:TKA7xskmHsubSXi9@cluster0.has0vkc.mongodb.net/?retryWrites=true&w=majority";

async function findAllGuestbook() {
    console.log('안녕');
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
    postContent: async (req, res) => {
        let name, content, profileImage, addDate;
        
        //content가 없으면 데이터 저장 x
        if(req.body.content===undefined || req.body.content==='') {
            res.status(404).send({
                message: 'content is undefined!'
            });
        }
        //name이 없으면 name은 '아무개'로 지정
        if(req.body.name===undefined || req.body.name==='') {
            name = '아무개';
        }
        //imgUrl이 없으면 임의의 이미지로 지정
        if(req.body.profileImage===undefined || req.body.profileImage==='') {
            profileImage = '';
        }
        name = req.body.name;
        content = req.body.content;
        profileImage = req.body.profileImage;

        addDate = await insertIntoGuestbook(
            { name: name, content: content, profileImage:profileImage }
        );
        res.status(200).json({
            name: name,
            content: content,
            addDate: addDate,
            profileImage: profileImage
        });
    }
};