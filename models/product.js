const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

const detail = async (id) => {
  const results = await dbs.production.collection('products').find({_id: ObjectId(id)})
    .toArray();
  return results[0];
};

const list = async () => {
    const results = await dbs.production.collection('products').find({}).toArray();
    return results;
}

const removeOne = async (id) => {
  await dbs.production.collection('products').deleteOne({_id: ObjectId(id)});
  const results = await dbs.production.collection('products').find({}).toArray();
  return results;
}

const editOne = async (id, name, category, brand, image, price, salePrice, availability) => {
  dbs.production.collection('products').findAndModify({_id: ObjectId(id)}, ['_id', 'asc'],
   {$set: {name: name, category: category, brand: brand, image: image, price: price, salePrice: salePrice, availability: availability}});
  const results = await dbs.production.collection('products').find({_id: ObjectId(id)})
    .toArray();
  return results[0];
}

const addOne = async (name, category, brand, image, price, salePrice, availability) => {
  await dbs.production.collection('products').insertOne({name: name, category: category,
     brand: brand, image: image, price: price, salePrice: salePrice, availability: availability});
  const results = await dbs.production.collection('products').find({}).toArray();
  return results;
}

exports.detail = detail;

exports.list = list;

exports.removeOne = removeOne;

exports.editOne = editOne;

exports.addOne = addOne;