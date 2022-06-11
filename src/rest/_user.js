const Router = require("@koa/router");
const userService = require("../service/user");
const Joi = require("joi");
const validate = require("./_validation.js");

const login = async (ctx) => {
    ctx.body = await userService.login(ctx.request.body.name, ctx.request.body.password);
};
login.validationScheme = {
    body: {
        name: Joi.string().min(4).max(255),
        password: Joi.string().min(4).max(255),
    },
};

module.exports = (app) => {
    const router = new Router({ prefix: "/user", });

    router.post("/login", validate(login.validationScheme), login);

    app.use(router.routes()).use(router.allowedMethods());
};
