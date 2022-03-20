import { Model } from "sequelize";
import { DataTypes } from "sequelize";
export class WebSocketAuth extends Model{
    declare token:string;
    declare expiration:Date;
    static init(sequelize:any){
        super.init({
          token:DataTypes.STRING,
          expiration:DataTypes.DATE,
          user_id:DataTypes.INTEGER, 
        },{
          sequelize:sequelize,
          tableName:'spc_wsauth'
        });
    }
} 