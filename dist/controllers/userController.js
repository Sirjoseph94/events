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
exports.signInController = exports.signUpController = void 0;
const prismaClient_1 = __importDefault(require("../config/prismaClient"));
const hashPassword_1 = require("../utils/hashPassword");
const generateToken_1 = require("../utils/generateToken");
const signUpController = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClient_1.default.user.findUnique({
        where: {
            email: payload.email
        }
    });
    if (user) {
        throw { status: 400, message: `User with the email ${user.email} already exist, kindly sign in` };
    }
    const response = yield prismaClient_1.default.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            password: (yield (0, hashPassword_1.encryptPassword)(payload.password)),
            isAdmin: payload.isAdmin,
        },
    });
    return (0, generateToken_1.generateAccessToken)(response.id);
});
exports.signUpController = signUpController;
const signInController = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClient_1.default.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (!user) {
        throw `We have no record of the email ${payload.email}, please sign up`;
    }
    const match = yield (0, hashPassword_1.decryptPassword)(payload.password, user.password);
    if (!match) {
        throw "Password is not correct";
    }
    return (0, generateToken_1.generateAccessToken)(user.id);
});
exports.signInController = signInController;
