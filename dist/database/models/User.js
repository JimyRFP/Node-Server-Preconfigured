"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class User extends sequelize_1.Model {
    static init(sequelize) {
        super.init({
            first_name: sequelize_2.DataTypes.STRING,
            email: sequelize_2.DataTypes.STRING,
            is_active: sequelize_2.DataTypes.BOOLEAN,
            password_hash: sequelize_2.DataTypes.STRING,
        }, {
            sequelize: sequelize,
            tableName: 'spc_users',
        });
    }
}
exports.User = User;
