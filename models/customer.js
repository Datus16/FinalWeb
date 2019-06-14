const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

const detail = async (id) => {
  const results = await dbs.production.collection('customers').find({_id: ObjectId(id)})
    .toArray();
  return results[0];
};

const list = async () => {
    const results = await dbs.production.collection('customers').find().toArray();
    return results;
}

const remove = async (id) => {
  var myquery = { _id: ObjectId(id) };
  var newValue = { $set: { isDeleted: true } };
  const results = await dbs.production.collection('customers').updateOne(myquery, newValue);
  return results;
}

module.exports.add = async (customer) => {
  return await dbs.production.collection('customers').insertOne(customer);
};

exports.detail = detail;

exports.list = list;

exports.remove = remove;