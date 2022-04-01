import { UserCreateInterface } from "./types";
export declare function getUserSessionData(req: any): string;
export declare function getUserById(id: Number): Promise<Bluebird<T>>;
export declare function getUserByEmail(email: string): Promise<Bluebird<T>>;
export declare function getUserIdByUserEmail(email: string): Promise<number>;
export declare function deleteUserById(id: Number): Promise<Bluebird<T>>;
export declare function isUserExist(email: string): Promise<boolean>;
export declare function createUser(data: UserCreateInterface): Promise<Bluebird<T>>;
export declare function checkUserPassword(email: string, password_string: string): Promise<boolean>;
