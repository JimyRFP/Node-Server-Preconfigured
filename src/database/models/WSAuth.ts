import { Model } from "sequelize";
import { DataTypes } from "sequelize";
import { dataBase } from "../database";
export class WebSocketAuth extends Model{
    declare token:string;
    declare expiration:Date;
    declare auth_connection_token:string;
} 

WebSocketAuth.init({
  token:DataTypes.STRING,
  expiration:DataTypes.DATE,
  user_id:DataTypes.INTEGER, 
  is_active:DataTypes.BOOLEAN,
  auth_connection_token:DataTypes.STRING,
},{
  sequelize:dataBase,
  tableName:'spc_wsauth'
});