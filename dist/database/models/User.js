"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const database_1 = require("../database");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    first_name: sequelize_2.DataTypes.STRING,
    email: sequelize_2.DataTypes.STRING,
    is_active: sequelize_2.DataTypes.BOOLEAN,
    password_hash: sequelize_2.DataTypes.STRING,
    last_action: sequelize_2.DataTypes.DATE,
}, {
    sequelize: database_1.dataBase,
    tableName: 'spc_users',
});
