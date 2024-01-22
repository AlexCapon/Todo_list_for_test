const Status = require('../models/Staus');
const statusesMock = require('../mock/statuses.json');
const { showErrorMessage } = require('../util/showErrorMessage');
const { Model } = require('mongoose');
const { log } = require('console');

module.exports = async () => { 
  const statuses = await Status.find();
  if (statuses.length < statusesMock.length) {
    log('Length of statuses array is less then length of mock');
    log('Trying to create initial entity');
    await createInitialEntity(Status, statusesMock);
  };
 };

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  log('collection dropped!');
  return Promise.all(
    data.map(async (item) => {
      try {
        log('Trying to delete item._id');
        delete item._id;
        log('Trying to create new Item');
        const newItem = new Model(item);
        log('newItem created');
        log(newItem);
        log('Trying to save new Item');
        await newItem.save();
        log('New item saved!');
        return newItem;
      } catch (error) {
        log('Try failed');
        showErrorMessage(error);
        return error;
      }
    })
  )
}