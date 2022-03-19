import { Model } from "sequelize";
import { DataTypes } from "sequelize";

export class User extends Model{
    static init(sequelize:any){
        super.init({
            first_name:DataTypes.STRING,
            email:DataTypes.STRING,
            is_active:DataTypes.BOOLEAN,
            password_hash:DataTypes.STRING,
        },
        { 
          sequelize:sequelize,  
          tableName: 'spc_users',  
        }
        );
    }
}


