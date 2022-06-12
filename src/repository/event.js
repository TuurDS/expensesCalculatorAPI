const { Event, User } = require("../data/models")

const getAllByUserId = async (userId) => {
    return events = (await User.findOne({ where: { id: userId } })).getEvents();
};

module.exports = {
    getAllByUserId,
};