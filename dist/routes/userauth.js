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
const response_1 = require("../utils/response");
const auth_1 = require("../auth/auth");
const meta_sanitizer_1 = __importDefault(require("meta-sanitizer"));
const users_1 = require("../users/users");
const auth_2 = require("../middlewares/auth");
const auth_3 = require("../auth/auth");
const auth_4 = require("../auth/auth");
const server_1 = require("../server");
const router = express_1.default.Router();
router.post('/logout', (req, res) => {
    let is_ok = false;
    if ((0, auth_1.userIsLogged)(req)) {
        (0, auth_4.logoutUser)(req);
        is_ok = true;
    }
    res.send((0, response_1.JSONResponse)("OK"));
});
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let email = "";
    let password = "";
    try {
        email = meta_sanitizer_1.default.sanitizeEmail(req.body.email);
        password = meta_sanitizer_1.default.queryProtector(req.body.password);
    }
    catch (e) {
        return res.status(403).send((0, response_1.JSONResponse)({}, "Must have 'email' and 'password' params"));
    }
    if (password == "" || email == "")
        return res.status(403).send((0, response_1.JSONResponse)({}, "Must have 'email' and 'password' params"));
    email = email.toLocaleLowerCase();
    try {
        const checkPass = yield (0, users_1.checkUserPassword)(email, password);
        if (checkPass) {
            const user = yield server_1.User.findOne({ where: { email: email } });
            if (!user)
                throw "Dont find User";
            if (!user.is_active) {
                return res.status(403).send((0, response_1.JSONResponse)({}, "User deleted"));
            }
            (0, auth_3.setUserLogged)(req, email);
            yield (0, users_1.updateUserLastAction)(user);
            return res.status(200).send((0, response_1.JSONResponse)("Login Ok"));
        }
        return res.status(403).send((0, response_1.JSONResponse)({}, "Invalid Password"));
    }
    catch (e) {
        return (0, response_1.sendIError)(req, res, e);
    }
}));
router.post('/getuser', auth_2.setUserDataMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send((0, response_1.JSONResponse)({ email: req.user.email, id: req.user.id }));
}));
exports.default = router;
