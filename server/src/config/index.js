const host = '34.162.229.43'

let DB_URI = `mongodb://${host}:27017/WSIE`;

if(process.env.MONGO_DB_UI)
{
    DB_URI = process.env.MONGO_DB_UI;
}

module.exports = {
    DB_URI
};