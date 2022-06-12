const eventRepository = require("../repository/event");


const getAllByUserId = async (userId) => {
    try {
        return await eventRepository.getAllByUserId(userId);
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    getAllByUserId,
};
