const { Event, User, Expense, Person, ExpensePerson } = require("../data/models")

const getAllByUserId = async (userId) => {
    return (await User.findOne({ where: { id: userId } })).getEvents();
};

const getById = async (id) => {
    return await Event.findByPk(id, {
        include: [
            { model: Expense, include: ["includedPersons", "personPaid"] },
        ]
    });
}

module.exports = {
    getAllByUserId,
    getById
};