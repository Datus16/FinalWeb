var MongoClient = require('mongodb').MongoClient;

var URL = 'mongodb://localhost:27017/clothingStore'

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