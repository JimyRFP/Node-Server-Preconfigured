import { Model } from "sequelize";
import { DataTypes } from "sequelize";
import { dataBase } from "../database";

export class User extends Model{
    declare id:number;
    declare email:string;
    declare first_name?:string;
    declare is_active:boolean;
    declare password_hash:string;
    declare last_action:Date;
}
User.init({
    first_name:DataTypes.STRING,
    email:DataTypes.STRING,
    is_active:DataTypes.BOOLEAN,
    password_hash:DataTypes.STRING,
    last_action:DataTypes.DATE,
},
{ 
  sequelize:dataBase,  
  tableName: 'spc_users',  
}
);


