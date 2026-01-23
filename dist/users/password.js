"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArgon2Hash = createArgon2Hash;
exports.checkArgon2Password = checkArgon2Password;
const argon2_1 = __importDefault(require("argon2"));
function createArgon2Hash(password_string) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let hash = yield argon2_1.default.hash(password_string);
            return hash;
        }
        catch (e) {
            return false;
        }
    });
}
function checkArgon2Password(password_hash, password_string) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (yield argon2_1.default.verify(password_hash, password_string))
                return "Match";
            return "Dont Match";
        }
        catch (e) {
            return "Dont Match";
        }
    });
}
