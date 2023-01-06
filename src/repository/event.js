const { sequelize, Event, User, Expense, Person, ExpensePerson } = require("../data/models")
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const SplitTypes = require("../data/splitTypes");


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
                    { model: Person, as: "includedPersons", attributes: ['id', 'name'], through: { attributes: ['value'] } }
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
            return { ...rest2, "value": ExpensePerson.value }
        })
        return expense;
    });

    return event;
}

const validate = async (EventId, userId) => {
    if (!await Event.findOne({ where: { id: EventId, UserId: userId } })) {
        return false;
    }
    return true;
};

const validateExpense = async (ExpenseId, userId) => {
    //find the event id of the expense
    const EventId = (await Expense.findOne({ where: { id: ExpenseId } })).EventId;

    //check if the user is the owner of the event
    if (!await Event.findOne({ where: { id: EventId, UserId: userId } })) {
        return false;
    }
    return true;
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
    //creating with the default values
    const event = await Event.create({ UserId: userId, name: "New Event", description: "", pinned: false });
    //find the user by id
    const user = await User.findByPk(userId);
    //create a person linked to the event named after the user
    const person = await Person.create({ name: user.name, EventId: event.id });

    return event;
}

const updateDetailsByEventId = async (obj) => {
    const t = await sequelize.transaction();
    try {
        //get the event by id
        const event = await Event.findByPk(obj.id);
        //update the name and description
        event.set('name', obj.name);
        event.set('description', obj.description);
        //save the event
        await event.save({ transaction: t });

        //get all the people linked to the event
        const peopleOfThisEvent = await Person.findAll({ where: { EventId: obj.id } });
        //add these people to the array if this name is not already in the array above
        const peopleToAdd = obj.People.filter(p => !peopleOfThisEvent.map(p => p.name).includes(p));
        //add these people to the list of persons
        await Promise.all(peopleToAdd.map(async (person) => {
            return await (Person.build({
                name: person,
                EventId: obj.id
            }, { transaction: t })).save({ transaction: t });
        }));

        //update all the expenses where the splitType is set to "EQUAL"
        const expenses = await Expense.findAll({ where: { EventId: obj.id, splitType: SplitTypes.Equal } });
        await Promise.all(expenses.map(async (expense) => {
            //we remove all the persons linked to this expense
            await ExpensePerson.destroy({ where: { ExpenseId: expense.id }, transaction: t });
            //we get all the persons linked to this event
            const persons = await Person.findAll({ where: { EventId: obj.id }, transaction: t });
            //we add all the persons to the expense with the value of the amount / number of persons
            await Promise.all(persons.map(async (person) => {
                return await (ExpensePerson.build({
                    ExpenseId: expense.id,
                    PersonId: person.id,
                    value: expense.amount / persons.length
                }, { transaction: t })).save({ transaction: t });
            }));
        }));


        await t.commit();
    } catch (error) {
        await t.rollback();
        throw error;
    }
}

const updateExpenseByEventId = async (obj) => {
    // body: {
    //     id: Joi.string().uuid(),
    //     description: Joi.string(),
    //     amount: Joi.number().min(0),
    //     date: Joi.date(),
    //     splitType: Joi.string().valid(...Object.values(SplitTypes)),
    //     paidname: Joi.string(),
    //     includedPersons: Joi.array().items({
    //         name: Joi.string(),
    //         value: Joi.number().allow(null).min(0),
    //     })
    // }
    const t = await sequelize.transaction();
    try {
        // update the description, amount, date, splitType and paidId of the expense
        const expense = await Expense.findByPk(obj.id);

        //eventId
        const EventId = (await Expense.findOne({ where: { id: obj.id } })).EventId;

        expense.set('description', obj.description);
        expense.set('amount', obj.amount);
        expense.set('date', obj.date);
        expense.set('splitType', obj.splitType);
        const paidPerson = await Person.findOne({ where: { name: obj.paidname, EventId: EventId } });
        expense.set('paidId', paidPerson.id);

        await expense.save({ transaction: t });

        //update the persons linked to the expense
        //remove all the included persons that are linked to this expense
        await ExpensePerson.destroy({ where: { ExpenseId: obj.id }, transaction: t });

        //if the split type is equal to "equal", we need to set the value of each person linked to the Event to the amount / number of persons
        if (obj.splitType === SplitTypes.Equal) {
            //we get all the persons linked to this event
            const persons = await Person.findAll({ where: { EventId: EventId } });
            //we add all the persons to the expense with the value of the amount / number of persons
            await Promise.all(persons.map(async (person) => {
                return await (ExpensePerson.build({
                    ExpenseId: obj.id,
                    PersonId: person.id,
                    value: obj.amount / persons.length
                }, { transaction: t })).save({ transaction: t });
            }));
        } else {
            //for each included person, add them to the expense 
            await Promise.all(obj.includedPersons.map(async (person) => {
                const personId = (await Person.findOne({ where: { name: person.name, EventId: EventId } })).id;
                return await (ExpensePerson.build({
                    ExpenseId: obj.id,
                    PersonId: personId,
                    value: person.value
                }, { transaction: t })).save({ transaction: t });
            }));

            const sum = obj.includedPersons.reduce((total, person) => {
                return total + person.value
            }, 0)

            if (!validateExpenseValues(obj.amount, sum, obj.splitType)) {
                throw Error("the expense is not valid")
            }
        }

        await t.commit();
    } catch (error) {
        await t.rollback();
        throw error;
    }
}

const validateExpenseValues = (amount, sum, splitType) => {

    // if the splittype is equal check if the sum of the values is equal within 0.02 of the amount
    if (splitType === SplitTypes.Equal) {
        if (Math.abs(sum - amount) > 0.02) {
            return false;
        }
    }
    // if the splittype is percentage check if the sum of the values is equal to 100 margin of 0.02
    else if (splitType === SplitTypes.Percentage) {
        if (Math.abs(sum - 100) > 0.02) {
            return false;
        }
    }
    // if the splittype is amount check if the sum of the values is equal to the amount
    else if (splitType === SplitTypes.Amount) {
        if (Math.abs(sum - amount) > 0.01) {
            return false;
        }
    }
    return true;
}

module.exports = {
    getAllByUserId,
    getById,
    validate,
    searchByName,
    getPinnedEvents,
    updateEventPinById,
    create,
    updateDetailsByEventId,
    updateExpenseByEventId,
    validateExpense
};