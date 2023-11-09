import { Model } from "sequelize";
import { DataTypes } from "sequelize";

export class User extends Model{
    declare id:number;
    declare email:string;
    declare first_name?:string;
    declare is_active:boolean;
    declare password_hash:string;
    declare last_action:Date;
    static init(sequelize:any){
        super.init({
            first_name:DataTypes.STRING,
            email:DataTypes.STRING,
            is_active:DataTypes.BOOLEAN,
            password_hash:DataTypes.STRING,
            last_action:DataTypes.DATE,
        },
        { 
          sequelize:sequelize,  
          tableName: 'spc_users',  
        }
        );
    }
}


