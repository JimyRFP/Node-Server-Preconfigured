import { Model } from "sequelize";
export declare class WebSocketAuth extends Model {
    token: string;
    expiration: Date;
    auth_connection_token: string;
}
