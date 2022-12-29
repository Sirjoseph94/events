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
const UserValidation_1 = require("../middleware/validation/UserValidation");
const prismaClient_1 = __importDefault(require("../config/prismaClient"));
const hashPassword_1 = require("../utils/hashPassword");
const token_1 = require("../middleware/token");
const signUpController = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prismaClient_1.default.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            password: (yield (0, hashPassword_1.encryptPassword)(payload.password)),
            isAdmin: payload.isAdmin,
        },
    });
    return (0, token_1.generateAccessToken)(response.id);
});
exports.signUpController = signUpController;
const signInController = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = UserValidation_1.signInValidation.safeParse(payload);
    if (!isValid.success) {
        throw isValid.error;
    }
    const { email, password } = isValid.data;
    const user = yield prismaClient_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw `We have no record of the email ${email}, please sign up`;
    }
    const match = yield (0, hashPassword_1.decryptPassword)(password, user.password);
    if (!match) {
        throw "Password is not correct";
    }
    return (0, token_1.generateAccessToken)(user.id);
});
exports.signInController = signInController;
