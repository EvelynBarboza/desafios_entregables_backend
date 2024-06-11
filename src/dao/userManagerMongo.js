const { userModel } = require ('../models/users.models.js')

export class UserManagerMongo {
    constructor () {
        this.userModel = userModel;
    }

    async getUsers({limit = 10, numPage= 1}) {
        const users = await this.userModel.paginate({}, {limit, page: numPage, sort: {price: -1}, lean: true })
        return users    
    }

    async createUser(user) {
        return await this.userModel.create(user)
    }

    async getUserBy(filter) {
        return this.userModel.findOne({filter});
    }

    async getUserByEmail(email) {
        return this.users.find((user) => user.email === email);
    }
}