const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

const detail = async (id) => {
  const results = await dbs.production.collection('comments').find({_id: ObjectId(id)})
    .toArray();
  return results[0];
};

const showAll = async () => {
    const results = await dbs.production.collection('comments').find({}).toArray();
    return results;
}

exports.detail = detail;

exports.showAll = showAll;