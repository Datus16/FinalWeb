var MongoClient = require('mongodb').MongoClient;

var URL = 'mongodb+srv://trongledo:'+ encodeURIComponent('trong1234') + '@cluster0-iuwvp.mongodb.net/clothingStore?retryWrites=true';

var dbs = {production: {}};

function connect(url)
{
    return MongoClient.connect(url).then(client => client.db())
}

exports.initdb = async function()
{
    let database = await connect(URL);
    dbs.production = database;
}

exports.dbs = dbs;