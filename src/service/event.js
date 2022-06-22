const eventRepository = require("../repository/event");


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

const getPinnedEvents = async ({pinnedEvents}) => {
    try {
        return await eventRepository.getPinnedEvents(pinnedEvents);
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
            return await eventRepository.updateByEventId(object, userId);
        }
        return false;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    getAllByUserId,
    getById,
    updateByEventId,
    searchEventByName,
    getPinnedEvents
};
