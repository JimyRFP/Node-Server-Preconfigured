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
const express_1 = __importDefault(require("express"));
const secureset_1 = require("../sessions/secureset");
const config_1 = require("../auth/config");
const response_1 = require("../utils/response");
const auth_1 = require("../auth/auth");
const meta_sanitizer_1 = __importDefault(require("meta-sanitizer"));
const users_1 = require("../users/users");
const users_2 = require("../users/users");
var LoginErrorCode;
(function (LoginErrorCode) {
    LoginErrorCode[LoginErrorCode["NoError"] = 0] = "NoError";
    LoginErrorCode[LoginErrorCode["InvalidParams"] = 1] = "InvalidParams";
    LoginErrorCode[LoginErrorCode["InvalidPassword"] = 2] = "InvalidPassword";
})(LoginErrorCode || (LoginErrorCode = {}));
var RegisterUserErrorCode;
(function (RegisterUserErrorCode) {
    RegisterUserErrorCode[RegisterUserErrorCode["NoError"] = 0] = "NoError";
    RegisterUserErrorCode[RegisterUserErrorCode["InvalidParams"] = 1] = "InvalidParams";
    RegisterUserErrorCode[RegisterUserErrorCode["UserExist"] = 2] = "UserExist";
    RegisterUserErrorCode[RegisterUserErrorCode["InternalError"] = 3] = "InternalError";
})(RegisterUserErrorCode || (RegisterUserErrorCode = {}));
const router = express_1.default.Router();
router.post('/logout', (req, res) => {
    let is_ok = false;
    if (auth_1.userIsLogged(req)) {
        secureset_1.deleteSessionValue(req, config_1.SESSION_LOGGED_DATA);
        is_ok = true;
    }
    res.send(response_1.JSONResponse(is_ok, 0, is_ok ? "" : "User Must be logged", {}));
});
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let email = "";
    let password = "";
    try {
        email = meta_sanitizer_1.default.sanitizeEmail(req.body.email);
        password = meta_sanitizer_1.default.queryProtector(req.body.password);
    }
    catch (e) {
        return res.send(response_1.JSONResponse(false, LoginErrorCode.InvalidParams, "Must have 'email' and 'password' params"));
    }
    if (password == "" || email == "")
        return res.send(response_1.JSONResponse(false, LoginErrorCode.InvalidParams, "Must have 'email' and 'password' params"));
    const checkPass = yield users_1.checkUserPassword(email, password);
    if (checkPass) {
        secureset_1.setSessionValue(req, config_1.SESSION_LOGGED_DATA, email);
        return res.send(response_1.JSONResponse(true, LoginErrorCode.NoError, "Login Ok"));
    }
    return res.send(response_1.JSONResponse(false, LoginErrorCode.InvalidPassword, "Invalid Password"));
}));
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let email = meta_sanitizer_1.default.sanitizeEmail(req.body.email || '');
        let password = meta_sanitizer_1.default.queryProtector(req.body.password || '');
        let name = meta_sanitizer_1.default.SanitizerEngine(req.body.name || '', true, false, [' ']).sanitizedData;
        if (email == "" || password == "" || name == "")
            return res.send(response_1.JSONResponse(false, RegisterUserErrorCode.InvalidParams, "Invalid params"));
        yield users_2.createUser({ first_name: name, email: email, password_string: password });
        return res.send(response_1.JSONResponse(true, RegisterUserErrorCode.NoError, "", "REGISTER OK"));
    }
    catch (e) {
        if (e === "User exist")
            return res.send(response_1.JSONResponse(false, RegisterUserErrorCode.UserExist, "User Exist"));
        return res.send(response_1.JSONResponse(false, RegisterUserErrorCode.InternalError, "I-Error"));
    }
}));
exports.default = router;
