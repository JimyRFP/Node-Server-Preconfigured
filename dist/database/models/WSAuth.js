"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketAuth = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const database_1 = require("../database");
class WebSocketAuth extends sequelize_1.Model {
}
exports.WebSocketAuth = WebSocketAuth;
WebSocketAuth.init({
    token: sequelize_2.DataTypes.STRING,
    expiration: sequelize_2.DataTypes.DATE,
    user_id: sequelize_2.DataTypes.INTEGER,
    is_active: sequelize_2.DataTypes.BOOLEAN,
    auth_connection_token: sequelize_2.DataTypes.STRING,
}, {
    sequelize: database_1.dataBase,
    tableName: 'spc_wsauth'
});
