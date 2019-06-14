const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

const detail = async (id) => {
  const results = await dbs.production.collection('products').find({_id: ObjectId(id)})
    .toArray();
  return results[0];
};

const list = async () => {
    const results = await dbs.production.collection('products').find({isDeleted: false}).toArray();
    return results;
}

const remove = async (id) => {
  var myquery = { _id: ObjectId(id) };
  var newValue = { $set: { isDeleted: true } };
  const results = await dbs.production.collection('products').updateOne(myquery, newValue);
  return results;
}

module.exports.add = async (product) => {
  return await dbs.production.collection('products').insertOne(product);
};

exports.detail = detail;

exports.list = list;

exports.remove = remove;