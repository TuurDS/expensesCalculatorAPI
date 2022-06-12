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

module.exports = {
    getAllByUserId,
    getById
};
