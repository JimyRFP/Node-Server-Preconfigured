export declare function createArgon2Hash(password_string: string): Promise<string | false>;
export declare function checkArgon2Password(password_hash: string, password_string: string): Promise<"Match" | "Dont Match">;
