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
const express_1 = require("express");
const email_1 = require("../utils/validators/email");
const server_1 = require("../server");
const server_2 = require("../server");
const response_1 = require("../utils/response");
const meta_sanitizer_1 = __importDefault(require("meta-sanitizer"));
const router = (0, express_1.Router)();
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let email = meta_sanitizer_1.default.sanitizeEmail(req.body.email || '');
        let password = meta_sanitizer_1.default.queryProtector(req.body.password || '');
        let name = meta_sanitizer_1.default.SanitizerEngine(req.body.name || '', true, false, [' ']).sanitizedData;
        if (email == "" || password == "" || name == "")
            return res.send((0, server_2.JSONResponse)({}, "Invalid params"));
        email = email.toLocaleLowerCase();
        if (!(0, email_1.checkEmail)(email)) {
            return res.status(403).send((0, server_2.JSONResponse)({}, "Invalid Email"));
        }
        yield (0, server_1.createUser)({ first_name: name, email: email, password_string: password });
        return res.send((0, server_2.JSONResponse)("REGISTER OK"));
    }
    catch (e) {
        if (e === "User exist")
            return res.send((0, server_2.JSONResponse)({}, "User Exist"));
        return (0, response_1.sendIError)(req, res, e);
    }
}));
exports.default = router;
