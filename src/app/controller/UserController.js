const UserService = require('../service/UserService');
const { paginateSerialize, serialize} = require('../serialize/userSerialize')

class UserController  {
  async create(req, res) {
    try {
      const result = await UserService.create(req.body);
      return res.status(201).json(serialize(result));
    } catch(erro) {
      const err = {
        description: erro.description,
        name: erro.name
      }
      return res.status(erro.statusCode || 400).json(err).end();
    }
  }
  async getAll(req, res) { 
    try {
      const result = await UserService.getAll(req.query); 
      return res.status(200).json(paginateSerialize(result)).end();
    } catch(erro) {
      const err = {
        description: erro.description,
        name: erro.name
      }
      return res.status(erro.statusCode).json(err).end();
    }
  }
  async getById(req, res) {
    try {
      const id = req.params.id;
      const result = await UserService.getById(id);
      return res.status(200).json(serialize(result));
    } catch(erro) {
      const err = {
        description: erro.description,
        name: erro.name
      }
      return res.status(erro.statusCode).json(err).end();
    }
  }
  async update(req, res) {
    try {
      const id = req.params.id;
      const result = await UserService.update(id, req.body);
      return res.status(200).json(serialize(result)).end();
    } catch(erro) {
      const err = {
        description: erro.description,
        name: erro.name
      }
      return res.status(erro.statusCode || 400).json(err).end();
    }
  }
  async remove(req, res) {
    try {
      const id = req.params.id;
      await UserService.remove(id);
      return res.status(204).end();
    } catch(erro) {
      const err = {
        description: erro.description,
        name: erro.name
      }
      return res.status(erro.statusCode).json(err).end();
    }
  }
}

module.exports = new UserController();