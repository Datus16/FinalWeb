const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

const detail = async (id) => {
  const results = await dbs.production.collection('accounts').find({_id: ObjectId(id)})
    .toArray();
  return results[0];
};

const list = async () => {
    const results = await dbs.production.collection('accounts').find({}).toArray();
    return results;
}

const removeOne = async (id) => {
    await dbs.production.collection('accounts').deleteOne({_id: ObjectId(id)});
    const results = await dbs.production.collection('accounts').find({}).toArray();
    return results;
  }

exports.detail = detail;

exports.list = list;

exports.removeOne = removeOne;