import { Model } from "sequelize";
export declare class User extends Model {
    email: string;
    first_name?: string;
    is_active: boolean;
    password_hash: string;
    static init(sequelize: any): void;
}
