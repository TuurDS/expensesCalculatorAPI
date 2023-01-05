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
        if (await eventRepository.validate(object, userId)) {
            await eventRepository.updateByEventId(object, userId);
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
    }
};


const updateEventPinById = async (object, userId) => {
    if (await eventRepository.validate(object, userId)) {
        await eventRepository.updateEventPinById(object);
        return { message: "Event pinned successfully", status: 200 }
    }
    throw ServiceError.notFound("Event not found");
};


const create = async (userId) => {
    try {
        const event = await eventRepository.create(userId);
        return { message: "Event created successfully", eventId: event.id, status: 200 }
    } catch (error) {
        throw ServiceError.notFound("error while creating event");
    }
};


module.exports = {
    getAllByUserId,
    getById,
    updateByEventId,
    searchEventByName,
    getPinnedEvents,
    updateEventPinById,
    create
};
