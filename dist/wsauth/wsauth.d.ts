export declare function getWSAuthDataByUserId(userId: number): Promise<any>;
export declare function setWSAuthDataNewToken(userId: number, expiration_hours?: number): Promise<any>;
export declare function checkWSAuthToken(userId: number, token: string): Promise<boolean>;
