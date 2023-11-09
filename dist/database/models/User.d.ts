import { Model } from "sequelize";
export declare class User extends Model {
    id: number;
    email: string;
    first_name?: string;
    is_active: boolean;
    password_hash: string;
    last_action: Date;
    static init(sequelize: any): void;
}
