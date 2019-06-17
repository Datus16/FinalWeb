const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

const detail = async (id) => {
  const results = await dbs.production.collection('brands').find({_id: ObjectId(id)})
    .toArray();
  return results[0];
};

const list = async () => {
    const results = await dbs.production.collection('brands').find().toArray();
    return results;
}

const editOne = async (id, name) => {
  dbs.production.collection('brands').findAndModify({_id: ObjectId(id)}, ['_id', 'asc'],
   {$set: {name: name}});
  const results = await dbs.production.collection('brands').find({_id: ObjectId(id)})
    .toArray();
  return results[0];
}


exports.detail = detail;

exports.list = list;

exports.editOne = editOne;