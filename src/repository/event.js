const { sequelize, Event, User, Expense, Person, ExpensePerson } = require("../data/models")
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getAllByUserId = async (userId) => {
    return (await User.findOne({ where: { id: userId } })).getEvents();
};

const getPinnedEvents = async (userId) => {
    return (await Event.findAll({ where: { UserId: userId, pinned: true } }));
};

const searchByName = async (name, userId) => {
    return (await Event.findAll({ where: { name: { [Op.substring]: `${name}` }, UserId: userId } }));
};

const getById = async (id) => {
    let event = await Event.findByPk(id, {
        include: [
            { model: Person, attributes: ['id', 'name'] },
            {
                model: Expense, attributes: ['id', 'description', 'amount', 'date', 'splitType'],
                include: [
                    { model: Person, as: "paid", attributes: ['name', 'id'] },
                    { model: Person, as: "includedPersons", attributes: ['id', 'name'], through: { attributes: ['percentage', 'amount'] } }
                ]
            },
        ],
        attributes: ['id', 'name', 'description', 'UserId']
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

const validate = async (obj, userId) => {
    if (!await Event.findOne({ where: { id: obj.id, UserId: userId } })) {
        return false;
    }
    return true;
};

const updateByEventId = async (obj, userId) => {
    const t = await sequelize.transaction();
    try {
        await (await Event.findOne({ where: { id: obj.id } }, { transaction: t })).destroy({ transaction: t });
        await (Event.build({ id: obj.id, name: obj.name, description: obj.description, UserId: userId }, { transaction: t })).save({ transaction: t });

        await Promise.all(obj.People.map(async (person) => {
            return await (Person.build({
                id: person.id,
                name: person.name,
                EventId: obj.id
            }, { transaction: t })).save({ transaction: t });
        }));

        await Promise.all(obj.Expenses.map(async (exp) => {
            await (Expense.build({
                id: exp.id,
                description: exp.description,
                amount: exp.amount,
                date: exp.date,
                splitType: exp.splitType,
                EventId: obj.id,
                paidId: exp.paid.id
            }, { transaction: t })).save({ transaction: t });
            return await Promise.all(exp.includedPersons.map(async (person) => {
                return await (ExpensePerson.build({
                    percentage: person.percentage,
                    amount: person.amount,
                    PersonId: person.id,
                    ExpenseId: exp.id
                }, { transaction: t })).save({ transaction: t });
            }));
        }));

        await t.commit();
    } catch (error) {
        console.log(error);
        await t.rollback();
        return false;
    }
};

const updateEventPinById = async (object) => {
    //get event by id
    const event = await Event.findByPk(object.id);
    //update pinned
    event.set('pinned', object.pinned);
    //save
    await event.save();
    return true;
}


const create = async (userId) => {
    //this creates a new event with the default values
    //name: "New Event"
    //description: ""
    //UserId: userId
    //pinned: false
    //create 1 person with name of the user who created the event
    //creating with the default values
    const event = await Event.create({ UserId: userId, name: "New Event", description: "", pinned: false });
    //find the user by id
    const user = await User.findByPk(userId);
    //create a person linked to the event named after the user
    const person = await Person.create({ name: user.name, EventId: event.id });

    return event;
}

module.exports = {
    getAllByUserId,
    getById,
    validate,
    updateByEventId,
    searchByName,
    getPinnedEvents,
    updateEventPinById,
    create
};