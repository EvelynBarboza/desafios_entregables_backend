const { UserManagerMongo } = require("../dao/userDaoMongo");

exports.userService = new UserManagerMongo()