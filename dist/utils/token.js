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
exports.auth = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const prismaClient_1 = __importDefault(require("../config/prismaClient"));
// const createNameSpace = cls_hooked.createNamespace
dotenv_1.default.config();
const key = process.env.AUTH_SECRET;
function generateAccessToken(id) {
    const key = process.env.AUTH_SECRET;
    const token = jsonwebtoken_1.default.sign({ user_id: id }, key, {
        expiresIn: "24h",
    });
    return token;
}
exports.generateAccessToken = generateAccessToken;
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authorization = req.headers.authorization;
        if (!authorization)
            return res.status(401).json({ error: "Access Denied, no token Provided" });
        try {
            const token = authorization.slice(7, authorization.length);
            const decoded = jsonwebtoken_1.default.verify(token, key);
            if (!decoded) {
                res.status(401).send("Unauthorized");
            }
            const { user_id } = decoded;
            const user = yield prismaClient_1.default.user.findUnique({
                where: {
                    id: user_id,
                },
            });
            if (!user) {
                res.status(401).send("please register to access our service");
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            res.status(400).send(error);
        }
    });
}
exports.auth = auth;
