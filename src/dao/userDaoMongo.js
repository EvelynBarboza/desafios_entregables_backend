const { usersModel } = require ('../models/users.models.js')
const paginate = require('mongoose-paginate-v2');

class UserManagerMongo {
    constructor () {
        this.usersModel = usersModel;
    }

    async getUsers({limit = 10, numPage= 1}) {
        const users = await this.usersModel.paginate({}, {limit, page: numPage, sort: {price: -1}, lean: true })
        return users    
    }

    async createUser(newUser) {
        return await this.usersModel.create(newUser)
    }

    async getUserBy(filter) {
        return this.usersModel.findOne({filter});
    }

    async getUserByEmail(email) {
        return this.usersModel.findOne({email});
    }
    
}

module.exports = 
    {UserManagerMongo};