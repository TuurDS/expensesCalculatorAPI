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

const createEvent = async (ctx) => {
    ctx.body = await eventService.create(decode(ctx.headers.authorization.substr(7)).user.id)
};
createEvent.validationScheme = null;

const updateEventPinById = async (ctx) => {
    ctx.body = await eventService.updateEventPinById(ctx.request.body, decode(ctx.headers.authorization.substr(7)).user.id)
};
updateEventPinById.validationScheme = {
    body: {
        id: Joi.string().uuid(),
        pinned: Joi.boolean(),
    }
}

const updateDetailsByEventId = async (ctx) => {
    ctx.body = await eventService.updateDetailsByEventId(ctx.request.body, decode(ctx.headers.authorization.substr(7)).user.id)
};
updateDetailsByEventId.validationScheme = {
    body: {
        id: Joi.string().uuid(),
        name: Joi.string(),
        description: Joi.string(),
        People: Joi.array().items(Joi.string())
    }
}

const updateExpenseByEventId = async (ctx) => {
    ctx.body = await eventService.updateExpenseByEventId(ctx.request.body, decode(ctx.headers.authorization.substr(7)).user.id)
};
updateExpenseByEventId.validationScheme = {
    body: {
        id: Joi.string().uuid(),
        description: Joi.string(),
        amount: Joi.number().min(0),
        date: Joi.date(),
        splitType: Joi.string().valid(...Object.values(SplitTypes)),
        paidname: Joi.string(),
        includedPersons: Joi.array().items({
            name: Joi.string(),
            value: Joi.number().allow(null).min(0),
        })
    }
}

const deleteEventById = async (ctx) => {
    ctx.body = await eventService.deleteEventById(ctx.request.params.id, decode(ctx.headers.authorization.substr(7)).user.id)
};
deleteEventById.validationScheme = {
    params: {
        id: Joi.string().uuid(),
    }
}

const createExpenseByEventId = async (ctx) => {
    //create the expense of the event by event id with default values so that the user can edit it later
    //so we dont need body
    ctx.body = await eventService.createExpenseByEventId(ctx.request.params.id, decode(ctx.headers.authorization.substr(7)).user.id)
};
createExpenseByEventId.validationScheme = {
    params: {
        id: Joi.string().uuid(),
    }
}

const deleteExpenseByEventId = async (ctx) => {
    ctx.body = await eventService.deleteExpenseByEventId(ctx.request.params.id, decode(ctx.headers.authorization.substr(7)).user.id)
};
deleteExpenseByEventId.validationScheme = {
    params: {
        id: Joi.string().uuid(),
    }
}

const reportByEventId = async (ctx) => {
    ctx.body = await eventService.reportByEventId(ctx.request.params.id, decode(ctx.headers.authorization.substr(7)).user.id)
};
reportByEventId.validationScheme = {
    params: {
        id: Joi.string().uuid(),
    }
}


module.exports = (app) => {
    const router = new Router({ prefix: "/event", });

    router.get("/", requireAuthentication, validate(getAllEventsByUserId.validationScheme), getAllEventsByUserId);
    router.get("/:id", requireAuthentication, validate(getEventById.validationScheme), getEventById);
    router.get("/search/:name", requireAuthentication, validate(searchEventByName.validationScheme), searchEventByName);
    router.get("/pinned/all", requireAuthentication, validate(getPinnedEvents.validationScheme), getPinnedEvents);
    router.get("/report/:id", requireAuthentication, validate(reportByEventId.validationScheme), reportByEventId);

    router.post("/", requireAuthentication, validate(createEvent.validationScheme), createEvent);
    router.post("/expense/:id", requireAuthentication, validate(createExpenseByEventId.validationScheme), createExpenseByEventId);

    router.put("/pin", requireAuthentication, validate(updateEventPinById.validationScheme), updateEventPinById);
    router.put("/details", requireAuthentication, validate(updateDetailsByEventId.validationScheme), updateDetailsByEventId);
    router.put("/expense", requireAuthentication, validate(updateExpenseByEventId.validationScheme), updateExpenseByEventId);

    router.delete("/:id", requireAuthentication, validate(deleteEventById.validationScheme), deleteEventById);
    router.delete("/expense/:id", requireAuthentication, validate(deleteExpenseByEventId.validationScheme), deleteExpenseByEventId);

    app.use(router.routes()).use(router.allowedMethods());
};
