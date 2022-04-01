"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataBase = void 0;
//@ts-ignore
//@ts-nocheck
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("./../settings/database/database"));
exports.dataBase = new sequelize_1.Sequelize(database_1.default);
