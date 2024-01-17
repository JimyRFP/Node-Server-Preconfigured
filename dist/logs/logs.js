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
exports.saveLog = exports.saveInternalErrorLog = exports.getIpFromRequest = exports.stringfyError = exports.LogSeverity = exports.BASE_LOG_PATH = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.BASE_LOG_PATH = './logs';
var LogSeverity;
(function (LogSeverity) {
    LogSeverity["danger"] = "danger";
    LogSeverity["servere"] = "severe";
    LogSeverity["moderate"] = "moderate";
    LogSeverity["info"] = "info";
})(LogSeverity = exports.LogSeverity || (exports.LogSeverity = {}));
function stringfyError(err) {
    const type = typeof (err);
    if (type !== 'object')
        return err.toString();
    let ret = stringfyObject(err, 0);
    return ret || "";
    function stringfyObject(obj, level = 0) {
        if (!obj)
            return null;
        if (typeof (obj) !== 'object')
            return obj.toString();
        if (level == 8)
            return "Is Object level max 8";
        let ret = {};
        for (let key of Object.keys(obj)) {
            let value = obj[key];
            //@ts-ignore
            ret[key] = typeof (value) == 'object' ? stringfyObject(value, level + 1).replaceAll('\\', '') : value === null || value === void 0 ? void 0 : value.toString();
        }
        return JSON.stringify(ret);
    }
}
exports.stringfyError = stringfyError;
function getIpFromRequest(req) {
    //@
    let ips = (req.headers['cf-connecting-ip'] ||
        req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.ip || '');
    if (typeof (ips) == 'string') {
        ips = ips.split(',');
    }
    return ips[0].trim();
}
exports.getIpFromRequest = getIpFromRequest;
function saveInternalErrorLog(req, error, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ip = getIpFromRequest(req);
            const url = req.originalUrl;
            //@ts-ignore
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            let errorString = stringfyError(error);
            saveLog({
                ip: ip,
                url: url,
                userId: userId,
                data: errorString,
                severity: (options === null || options === void 0 ? void 0 : options.severity) || LogSeverity.info,
                penTestSuspcion: options === null || options === void 0 ? void 0 : options.penTestSuspcion,
            });
        }
        catch (e) {
            console.log("Error ON Save Log", e);
        }
    });
}
exports.saveInternalErrorLog = saveInternalErrorLog;
function saveLog(options) {
    if (!fs_1.default.existsSync(exports.BASE_LOG_PATH)) {
        fs_1.default.mkdirSync(exports.BASE_LOG_PATH);
    }
    let basePath = exports.BASE_LOG_PATH;
    if (options.addPath) {
        basePath = path_1.default.join(basePath, options.addPath);
        if (!fs_1.default.existsSync(basePath)) {
            fs_1.default.mkdirSync(basePath);
        }
    }
    if (options.userId) {
        basePath = path_1.default.join(basePath, options.userId.toString());
    }
    else {
        basePath = path_1.default.join(basePath, "unlogged");
    }
    if (!fs_1.default.existsSync(basePath)) {
        fs_1.default.mkdirSync(basePath);
    }
    let fileName = path_1.default.join(basePath, `${options.filePrefix ? options.filePrefix + '_' : ""}${getDateString(new Date())}.csv`);
    let data = "";
    if (fs_1.default.existsSync(fileName)) {
        data = fs_1.default.readFileSync(fileName).toString() + "\n";
    }
    if (!data) {
        data = 'Data;Severidade;Usuário;Dados;IP;URL;Supeita de Ataque\n';
    }
    data += `${new Date()};${options.severity};${options.userId || "Deslogado"};${options.data};${options.ip || "Não Informado"};${options.url || "Não Informado"};${options.penTestSuspcion ? "SIM" : "NÃO"}`;
    fs_1.default.writeFileSync(fileName, data);
    return {
        fileName,
        basePath,
    };
}
exports.saveLog = saveLog;
function getDateString(d) {
    const year = d.getFullYear();
    const month = zerof(d.getMonth() + 1);
    const day = zerof(d.getDate());
    const hour = zerof(d.getHours());
    return `${year}_${month}_${day}_${hour}`;
    function zerof(n) {
        if (n > 9)
            return n.toString();
        return `0${n}`;
    }
}
