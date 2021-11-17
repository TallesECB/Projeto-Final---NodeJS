const CarRepository = require('../repository/CarRepository');

const IdNotFound = require('../errors/IdNotFound');
const WithoutAccessory = require('../errors/WithoutAccessory');

class CarService {
  async create(payload) {
    if (payload.acessorios.length === 0 || payload.acessorios.descricao === '') {
      throw new WithoutAccessory(payload.modelo);
    }
    const result = await CarRepository.create(payload);
    return result;
  }

  async getAll({ offset, limit, ...payloadFind }) {
    const result = await CarRepository.getAll(payloadFind, offset, limit);
    return result;
  }

  async getById(id) {
    const result = await CarRepository.getById(id);
    if (!result) {
      throw new IdNotFound(`Car - ${id}`);
    }
    return result;
  }

  async update(id, payload) {
    if (!(await CarRepository.getById(id))) {
      throw new IdNotFound(`Car - ${id}`);
    }
    const result = await CarRepository.update(id, payload);
    return result;
  }

  async updateAcessory(idCar, idAcessory, payload) {
    const result = await CarRepository.updateAcessory(idCar, idAcessory, payload);
    return result;
  }

  async remove(id) {
    if (!(await CarRepository.getById(id))) {
      throw new IdNotFound(`Car - ${id}`);
    }

    const result = await CarRepository.remove(id);
    return result;
  }
}

module.exports = new CarService();
