import { Model } from "sequelize";
export declare class WebSocketAuth extends Model {
    token: string;
    expiration: Date;
    static init(sequelize: any): void;
}
