import { Model } from "sequelize";
import { DataTypes } from "sequelize";
export class WebSocketAuth extends Model{
    declare token:string;
    declare expiration:Date;
    declare auth_connection_token:string;
    static init(sequelize:any){
        super.init({
          token:DataTypes.STRING,
          expiration:DataTypes.DATE,
          user_id:DataTypes.INTEGER, 
          is_active:DataTypes.BOOLEAN,
          auth_connection_token:DataTypes.STRING,
        },{
          sequelize:sequelize,
          tableName:'spc_wsauth'
        });
    }
} 