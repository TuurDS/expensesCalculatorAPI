const { restart } = require("nodemon");
const { Event, User, Expense, Person, ExpensePerson } = require("../data/models")

const getAllByUserId = async (userId) => {
    return (await User.findOne({ where: { id: userId } })).getEvents();
};

const getById = async (id) => {
    let event = await Event.findByPk(id, {
        include: [
            {
                model: Expense, attributes: ['id', 'description', 'amount', 'date', 'splitType'],
                include: [
                    { model: Person, as: "paid", attributes: ['name', 'id'] },
                    { model: Person, as: "includedPersons", attributes: ['id', 'name'], through: { attributes: ['percentage', 'amount'] } }
                ]
            }
        ]
    });

    //format specific object in structure
    event = JSON.parse(JSON.stringify(event));
    event.Expenses = event.Expenses.map(expense => {
        expense.includedPersons = expense.includedPersons.map(p => {
            const { ExpensePerson, ...rest2 } = p;
            return { ...rest2, "percentage": ExpensePerson.percentage, "amount": ExpensePerson.amount }
        })
        return expense;
    });

    return event;
}

module.exports = {
    getAllByUserId,
    getById
};