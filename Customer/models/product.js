const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

const detail = async (id) => {
  const results = await dbs.production.collection('products').find({_id: ObjectId(id)})
    .toArray();
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