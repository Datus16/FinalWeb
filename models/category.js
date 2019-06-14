const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

const detail = async (id) => {
  const results = await dbs.production.collection('categories').find({_id: ObjectId(id)})
    .toArray();
  return results[0];
};

const list = async () => {
    const results = await dbs.production.collection('categories').find().toArray();
    return results;
}

const remove = async (id) => {
  var myquery = { _id: ObjectId(id) };
  var newValue = { $set: { isDeleted: true } };
  const results = await dbs.production.collection('categories').updateOne(myquery, newValue);
  return results;
}

module.exports.add = async (category) => {
  return await dbs.production.collection('categories').insertOne(category);
};

exports.detail = detail;

exports.list = list;

exports.remove = remove;