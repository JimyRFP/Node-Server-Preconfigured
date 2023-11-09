import { User } from "./../database/models/User";
import { UserCreateInterface } from "./types";
export declare function updateUserLastAction(user: User): Promise<User>;
export declare function getUserSessionData(req: any): string;
export declare function getUserById(id: Number): Promise<any>;
export declare function getUserByEmail(email: string): Promise<any>;
export declare function getUserIdByUserEmail(email: string): Promise<number>;
export declare function deleteUserById(id: Number): Promise<any>;
export declare function isUserExist(email: string): Promise<boolean>;
export declare function createUser(data: UserCreateInterface): Promise<any>;
export declare function changeUserPassword(email: string, password: string): Promise<User>;
export declare function checkUserPassword(email: string, password_string: string): Promise<boolean>;
