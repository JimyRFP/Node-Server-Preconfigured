//@ts-nocheck
import {Sequelize}  from "sequelize";
import config from "./../settings/database/database";

export const dataBase=new Sequelize(config);
