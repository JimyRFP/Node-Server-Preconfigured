import { UserCreateInterface } from "./types";
export declare function getUserById(id: Number): Promise<any>;
export declare function getUserByEmail(email: string): Promise<any>;
export declare function deleteUserById(id: Number): Promise<any>;
export declare function isUserExist(email: string): Promise<boolean>;
export declare function createUser(data: UserCreateInterface): Promise<any>;
export declare function checkUserPassword(email: string, password_string: string): Promise<boolean>;
