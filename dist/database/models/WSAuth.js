"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class WebSocketAuth extends sequelize_1.Model {
    static init(sequelize) {
        super.init({
            token: sequelize_2.DataTypes.STRING,
            expiration: sequelize_2.DataTypes.DATE,
            user_id: sequelize_2.DataTypes.INTEGER,
            is_active: sequelize_2.DataTypes.BOOLEAN,
            auth_connection_token: sequelize_2.DataTypes.STRING,
        }, {
            sequelize: sequelize,
            tableName: 'spc_wsauth'
        });
    }
}
exports.WebSocketAuth = WebSocketAuth;
