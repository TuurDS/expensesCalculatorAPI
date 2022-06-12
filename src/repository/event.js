const { Event, User, Expense, Person, ExpensePerson } = require("../data/models")

const getAllByUserId = async (userId) => {
    return (await User.findOne({ where: { id: userId } })).getEvents();
};

const getById = async (id) => {
    return await Event.findByPk(id, {
        include: [
            {
                model: Expense, attributes: ['id', 'description', 'amount', 'date', 'splitType'],
                include: [
                    { model: Person, as: "paid", attributes: ['name', 'id'] },
                    { model: Person, as: "includedPersons", attributes: ['id', 'name'] }
                ]
            }
        ]
    });
}

module.exports = {
    getAllByUserId,
    getById
};