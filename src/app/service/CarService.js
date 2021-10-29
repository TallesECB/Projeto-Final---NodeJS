const CarRepository = require('../repository/CarRepository');

const idNotFound = require('../errors/idNotFound');
const invalidObjectId = require('../errors/invalidObjectId')
const withoutAccessory = require('../errors/withoutAccessory');

const mongoose = require('mongoose');

class CarService {
  async create(payload) {
    if(payload.acessorios.length === 0 || payload.acessorios.descricao === "") {
      throw new withoutAccessory(payload.modelo)
    } 
    const result = await CarRepository.create(payload);
    return result;
  }
  async getAll({offset, limit, ...payloadFind}) { 
    const result = await CarRepository.getAll(payloadFind, offset, limit);
    return result;
  }
  async getById(id) {
    if(!mongoose.Types.ObjectId.isValid(id)) { 
      throw new invalidObjectId(id);
    }

    const result = await CarRepository.getById(id);

    if(!result) {
      throw new idNotFound(`Car - ${id}`);
    } 

    return result;
   
  }
  async update(id, payload) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      throw new invalidObjectId(id);
    }
    if(!await CarRepository.getById(id)) {
      throw new idNotFound(`Car - ${id}`);
    }

    const result = await CarRepository.update(id, payload);
    return result;
  }
  async remove(id) { 
    if(!mongoose.Types.ObjectId.isValid(id)) {
      throw new invalidObjectId(id);
    }
    if(!await CarRepository.getById(id)) {
      throw new idNotFound(`Car - ${id}`);
    } 

    const result = await CarRepository.remove(id);
    return result;
  }
}

module.exports = new CarService();
