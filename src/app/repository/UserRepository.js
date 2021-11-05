const UserSchema = require('../schema/UserSchema');
const limitPagination = require('../errors/limitPagination');
const offsetPagination = require('../errors/offsetPagination');

class UserRepository  {
  async create(payload) {
    return UserSchema.create(payload);
  }
  async getAll(payloadFind, offset, limit) {
    if(!offset){
      offset = 1;
    }
    if(!limit) {
      limit = 10;
    }
    offset = parseInt(offset)-1;
    limit = parseInt(limit);

    if(limit > 1000 && limit < 0) {
      throw new limitPagination(limit);
    }

    if(offset < 0) {
      throw new offsetPagination(offset);
    }

    return await UserSchema.paginate(payloadFind, {offset, limit});
  }
  async getById(id) {
    return UserSchema.findById(id);
  }
  async update(id, payload) {
    return UserSchema.findByIdAndUpdate(id, payload, {new: true});
  }
  async remove(id) {
    return UserSchema.findByIdAndRemove(id);
  }
}

module.exports = new UserRepository();