const Router = require("@koa/router");
const eventService = require("../service/event");
const Joi = require("joi");
const validate = require("./_validation.js");
const { decode } = require("jsonwebtoken");
const { requireAuthentication } = require("../core/auth");
const SplitTypes = require("../data/splitTypes");

const getAllEventsByUserId = async (ctx) => {
    ctx.body = await eventService.getAllByUserId(decode(ctx.headers.authorization.substr(7)).user.id)
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

const getPinnedEvents = async (ctx) => {
    ctx.body = await eventService.getPinnedEvents(decode(ctx.headers.authorization.substr(7)).user.id)
};
getPinnedEvents.validationScheme = null

const searchEventByName = async (ctx) => {
    ctx.body = await eventService.searchEventByName(ctx.request.params.name, decode(ctx.headers.authorization.substr(7)).user.id)
};
searchEventByName.validationScheme = {
    params: {
        name: Joi.string().min(1),
    }
}

const updateByEventId = async (ctx) => {
    ctx.body = await eventService.updateByEventId(ctx.request.body, decode(ctx.headers.authorization.substr(7)).user.id)
};
updateByEventId.validationScheme = {
    body: {
        id: Joi.string().uuid(),
        name: Joi.string(),
        People: Joi.array().items({
            id: Joi.string().uuid(),
            name: Joi.string()
        }),
        Expenses: Joi.array().items({
            id: Joi.string().uuid(),
            description: Joi.string(),
            amount: Joi.number().min(0),
            date: Joi.date(),
            splitType: Joi.string().valid(...Object.values(SplitTypes)),
            paid: Joi.object({
                id: Joi.string().uuid(),
                name: Joi.string()
            }),
            includedPersons: Joi.array().items({
                id: Joi.string().uuid(),
                name: Joi.string(),
                percentage: Joi.number().allow(null).min(0).max(1),
                amount: Joi.number().allow(null).min(0),
            })
        })
    }
}

const updateEventPinById = async (ctx) => {
    ctx.body = await eventService.updateEventPinById(ctx.request.body, decode(ctx.headers.authorization.substr(7)).user.id)
};
updateEventPinById.validationScheme = {
    body: {
        id: Joi.string().uuid(),
        pinned: Joi.boolean(),
    }
}
module.exports = (app) => {
    const router = new Router({ prefix: "/event", });

    router.get("/", requireAuthentication, validate(getAllEventsByUserId.validationScheme), getAllEventsByUserId);
    router.get("/:id", requireAuthentication, validate(getEventById.validationScheme), getEventById);

    router.get("/search/:name", requireAuthentication, validate(searchEventByName.validationScheme), searchEventByName);
    router.get("/pinned/all", requireAuthentication, validate(getPinnedEvents.validationScheme), getPinnedEvents);
    router.put("/", requireAuthentication, validate(updateByEventId.validationScheme), updateByEventId);
    router.put("/pin", requireAuthentication, validate(updateEventPinById.validationScheme), updateEventPinById);

    app.use(router.routes()).use(router.allowedMethods());
};
