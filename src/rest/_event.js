const Router = require("@koa/router");
const eventService = require("../service/event");
const Joi = require("joi");
const validate = require("./_validation.js");
const { decode } = require("jsonwebtoken");
const { requireAuthentication } = require("../core/auth");

const getAllEventsByUserId = async (ctx) => {
    ctx.body = await eventService.getAllByUserId(decode(ctx.headers.authorization.substr(7)).userId)
};
getAllEventsByUserId.validationScheme = null;

const getEventById = async (ctx) => {
    ctx.body = await eventService.getById(ctx.request.params.id)
};
getEventById.validationScheme = {
    params: {
        id: Joi.string().uuid(),
    }
}

module.exports = (app) => {
    const router = new Router({ prefix: "/event", });

    router.get("/", requireAuthentication, validate(getAllEventsByUserId.validationScheme), getAllEventsByUserId);
    router.get("/:id", requireAuthentication, validate(getEventById.validationScheme), getEventById);

    app.use(router.routes()).use(router.allowedMethods());
};
