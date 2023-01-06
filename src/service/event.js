const eventRepository = require("../repository/event");
const ServiceError = require("../core/serviceError");

const getAllByUserId = async (userId) => {
    try {
        return await eventRepository.getAllByUserId(userId);
    } catch (error) {
        console.error(error);
    }
};

const getById = async (id) => {
    try {
        return await eventRepository.getById(id);
    } catch (error) {
        console.error(error);
    }
};

const getPinnedEvents = async (userId) => {
    try {
        return await eventRepository.getPinnedEvents(userId);
    } catch (error) {
        console.error(error);
    }
};

const searchEventByName = async (name, userId) => {
    try {
        return await eventRepository.searchByName(name, userId);
    } catch (error) {
        console.error(error);
    }
};

const updateByEventId = async (object, userId) => {
    try {
        if (await eventRepository.validate(object.id, userId)) {
            await eventRepository.updateByEventId(object, userId);
            return true;
        }
        return false;
    } catch (error) {
        throw ServiceError.validationFailed("error while updating event");
    }
};


const updateEventPinById = async (object, userId) => {
    if (await eventRepository.validate(object.id, userId)) {
        await eventRepository.updateEventPinById(object);
        return { message: "Event pinned successfully", status: 200 }
    }
    throw ServiceError.unauthorized("you are not authorized to update this event");
};


const create = async (userId) => {
    try {
        const event = await eventRepository.create(userId);
        return { message: "Event created successfully", eventId: event.id, status: 200 }
    } catch (error) {
        throw ServiceError.validationFailed("error while creating event");
    }
};

const updateDetailsByEventId = async (object, userId) => {
    try {
        if (await eventRepository.validate(object.id, userId)) {
            await eventRepository.updateDetailsByEventId(object);
            return { message: "Event details updated successfully", status: 200 };
        }
        throw ServiceError.unauthorized("you are not authorized to update the details of this event");
    } catch (error) {
        throw ServiceError.validationFailed("error while updating event");
    }
};

const updateExpenseByEventId = async (object, userId) => {
    try {
        if (await eventRepository.validateExpense(object.id, userId)) {
            await eventRepository.updateExpenseByEventId(object);
            return { message: "Event expense updated successfully", status: 200 };
        }
        throw ServiceError.unauthorized("you are not authorized to update the expense of this event");
    } catch (error) {
        throw ServiceError.validationFailed("error while updating event");
    }
};

module.exports = {
    getAllByUserId,
    getById,
    updateByEventId,
    searchEventByName,
    getPinnedEvents,
    updateEventPinById,
    create,
    updateDetailsByEventId,
    updateExpenseByEventId
};
