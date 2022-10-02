import * as Joi from "joi";

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string().valid("development", "production", "test").required(),
    PORT: Joi.number().default(3000),
    ADMIN_EMAIL: Joi.string().email().required(),
    ADMIN_PSEUDO: Joi.string().required(),
    ADMIN_PASSWORD: Joi.string().required(),
    ADMIN_ROLE_ID: Joi.number().required(),
    DEBUG: Joi.string().valid("true", "false").required(),
    DEBUG_GUARDS: Joi.string().valid("true", "false").required(),
    JWT_EXPIRE: Joi.number(),
    JWT_SECRET: Joi.string().required(),
});
