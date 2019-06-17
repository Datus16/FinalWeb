const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

const detail = async (id) => {
  const results = await dbs.production.collection('products').find({_id: ObjectId(id)})
    .toArray();
  var hitCount = results[0].hitCount + 1;
  dbs.production.collection('products').findAndModify({_id: ObjectId(id)}, [['_id','asc']], {$set: {hitCount: hitCount}});
  return results[0];
};

const showAll = async () => {
    const results = await dbs.production.collection('products').find({}).toArray();
    return results;
}

const showCategory = async (id) => {
  const results = await dbs.production.collection('products').find({category: id}).toArray();
  return results;
}

const showBrand = async (id) => {
  const results = await dbs.production.collection('products').find({brand: id}).toArray();
  return results;
}

exports.detail = detail;

exports.showAll = showAll;

exports.showCategory = showCategory;

exports.showBrand = showBrand;