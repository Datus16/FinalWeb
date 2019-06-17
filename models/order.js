const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

const detail = async (id) => {
  const results = await dbs.production.collection('orders').find({_id: ObjectId(id)})
    .toArray();
  return results[0];
};

const list = async () => {
    const results = await dbs.production.collection('orders').find().toArray();
    return results;
}

const editOne = async (id, customer, product, quantity, status) => {
  dbs.production.collection('orders').findAndModify({_id: ObjectId(id)}, ['_id', 'asc'],
   {$set: {customer: customer, product: product, quantity: quantity, status: status}});
  const results = await dbs.production.collection('orders').find({_id: ObjectId(id)})
    .toArray();
  return results[0];
}

exports.detail = detail;

exports.list = list;

exports.editOne = editOne;