"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInValidation = exports.signupValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupValidation = zod_1.default
    .object({
    email: zod_1.default.string().email(),
    name: zod_1.default.string(),
    password: zod_1.default.string().min(6),
    confirmPassword: zod_1.default.string().min(6),
    isAdmin: zod_1.default.boolean(),
})
    .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
        });
    }
});
exports.signInValidation = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
});
