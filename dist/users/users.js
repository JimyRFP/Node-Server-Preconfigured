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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserPassword = exports.changeUserPassword = exports.createUser = exports.isUserExist = exports.deleteUserById = exports.getUserIdByUserEmail = exports.getUserByEmail = exports.getUserById = exports.getUserSessionData = exports.updateUserLastAction = void 0;
const User_1 = require("./../database/models/User");
const password_1 = require("./password");
const config_1 = require("../auth/config");
const secureget_1 = require("../sessions/secureget");
function updateUserLastAction(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            user.last_action = new Date();
            yield user.save();
            return user;
        }
        catch (e) {
            throw e;
        }
    });
}
exports.updateUserLastAction = updateUserLastAction;
function getUserSessionData(req) {
    return (0, secureget_1.getSessionValue)(req, config_1.SESSION_LOGGED_DATA);
}
exports.getUserSessionData = getUserSessionData;
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield User_1.User.findOne({ where: { id: id.toString() } });
        return (result);
    });
}
exports.getUserById = getUserById;
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield User_1.User.findOne({ where: { email: email } });
        return (result);
    });
}
exports.getUserByEmail = getUserByEmail;
function getUserIdByUserEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let u = yield getUserByEmail(email);
            if (!Boolean(u))
                return NaN;
            return u.dataValues.id;
        }
        catch (e) {
            return NaN;
        }
    });
}
exports.getUserIdByUserEmail = getUserIdByUserEmail;
function deleteUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield User_1.User.destroy({ where: { id: id.toString() } });
        return result;
    });
}
exports.deleteUserById = deleteUserById;
function isUserExist(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield getUserByEmail(email);
            return Boolean(user);
        }
        catch (e) {
            throw (e);
        }
    });
}
exports.isUserExist = isUserExist;
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        let user_exist = false;
        try {
            user_exist = yield isUserExist(data.email);
        }
        catch (e) {
            throw (e);
        }
        if (user_exist)
            throw "User exist";
        let hash = yield (0, password_1.createArgon2Hash)(data.password_string);
        if (!hash)
            throw "Create argon2 hash error";
        try {
            let user_instance = yield User_1.User.create({ email: data.email,
                first_name: data.first_name,
                password_hash: hash });
            return user_instance;
        }
        catch (e) {
            throw e;
        }
    });
}
exports.createUser = createUser;
function changeUserPassword(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield User_1.User.findOne({ where: { email } });
            if (!user)
                throw "Unknwon User";
            let hash = yield (0, password_1.createArgon2Hash)(password);
            if (typeof (hash) !== "string")
                throw "Create Hash Error";
            user.password_hash = hash;
            yield user.save();
            return user;
        }
        catch (e) {
            throw e;
        }
    });
}
exports.changeUserPassword = changeUserPassword;
function checkUserPassword(email, password_string) {
    return __awaiter(this, void 0, void 0, function* () {
        let user;
        try {
            user = yield getUserByEmail(email);
        }
        catch (e) {
            throw e;
        }
        if (!user)
            return false;
        let hash = user.dataValues.password_hash;
        if ((yield (0, password_1.checkArgon2Password)(hash, password_string)) == 'Match')
            return true;
        return false;
    });
}
exports.checkUserPassword = checkUserPassword;
