export interface UserCreateInterface {
    first_name: string;
    email: string;
    password_string: string;
}
export declare type PasswordVerifyResult = 'Match' | 'Dont Match';
