const { sequelize, Event, User, Expense, Person, ExpensePerson } = require("../data/models")
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const SplitTypes = require("../data/splitTypes");
const moment = require('moment');
const Big = require('big.js');

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
    const t = await sequelize.transaction();
    try {
        //creating with the default values
        const event = await Event.create({ UserId: userId, name: "New Event", description: "", pinned: false });
        //find the user by id
        const user = await User.findByPk(userId);
        //create a person linked to the event named after the user
        const person = await Person.create({ name: user.name, EventId: event.id });

        await t.commit();
        return event;
    } catch (error) {
        await t.rollback();
        throw error;
    }
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

            // Calculate the value for each person using the big.js library
            const value = new Big(expense.amount).div(persons.length);

            //we add all the persons to the expense with the value of the amount / number of persons
            await Promise.all(persons.map(async (person) => {
                return await (ExpensePerson.build({
                    ExpenseId: expense.id,
                    PersonId: person.id,
                    value: value.toNumber()
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
    const t = await sequelize.transaction();
    try {
        // update the description, amount, date, splitType and paidId of the expense
        const expense = await Expense.findByPk(obj.id);

        //eventId
        const EventId = (await Expense.findOne({ where: { id: obj.id } })).EventId;

        expense.set('description', obj.description);
        expense.set('amount', obj.amount);
        //set the date but ignore the timezone
        expense.set('date', moment(obj.date).format("YYYY-MM-DD"));

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

            // Calculate the value for each person using the big.js library
            const value = new Big(obj.amount).div(persons.length);

            //we add all the persons to the expense with the value of the amount / number of persons
            await Promise.all(persons.map(async (person) => {
                return await (ExpensePerson.build({
                    ExpenseId: obj.id,
                    PersonId: person.id,
                    value: value.toNumber()
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

            // Initialize the sum to 0
            let sum = new Big(0);

            // Iterate over the included persons and add their values to the sum using the plus method of the Big object
            obj.includedPersons.forEach(person => {
                sum = sum.plus(person.value);
            });


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
    // Convert the amount and sum to Big objects
    const bigAmount = new Big(amount);
    const bigSum = new Big(sum);

    // if the splittype is equal check if the sum of the values is equal within 0.02 of the amount
    if (splitType === SplitTypes.Equal) {
        if (bigSum.minus(bigAmount).abs().gt(0.02)) {
            return false;
        }
    }
    // if the splittype is percentage check if the sum of the values is equal to 100 margin of 0.02
    else if (splitType === SplitTypes.Percentage) {
        if (bigSum.minus(100).abs().gt(0.02)) {
            return false;
        }
    }
    // if the splittype is amount check if the sum of the values is equal to the amount
    else if (splitType === SplitTypes.Amount) {
        if (bigSum.minus(bigAmount).abs().gt(0.01)) {
            return false;
        }
    }
    return true;
}


const deleteEventById = async (id) => {
    const t = await sequelize.transaction();
    //detele event all the expenses and all the persons linked to the event will be deleted because of the cascade
    try {
        await Event.destroy({ where: { id: id }, transaction: t });
        await t.commit();
    } catch (error) {
        await t.rollback();
        throw error;
    }
}

const createExpenseByEventId = async (id) => {
    const t = await sequelize.transaction();
    try {
        //name new expense
        //description new expense
        //amount 0
        //date new date
        //splitType equal
        //paidId first person of the event
        //eventId id
        const persons = await Person.findAll({ where: { EventId: id } });
        const expense = await (Expense.build({
            description: "New expense",
            amount: 0,
            date: new Date(),
            splitType: SplitTypes.Equal,
            paidId: persons[0].id,
            EventId: id
        }, { transaction: t })).save({ transaction: t });

        //default is the splittype equal so we need to add all the persons linked to the event with the value of 0 because the amount is 0
        await Promise.all(persons.map(async (person) => {
            return await (ExpensePerson.build({
                ExpenseId: expense.id,
                PersonId: person.id,
                value: 0
            }, { transaction: t })).save({ transaction: t });
        }));

        await t.commit();
        return expense;
    } catch (error) {
        await t.rollback();
        throw error;
    }
}

const deleteExpenseByEventId = async (id) => {
    const t = await sequelize.transaction();
    try {
        //delete expense
        await Expense.destroy({ where: { id: id }, transaction: t });
        await t.commit();
    } catch (error) {
        await t.rollback();
        throw error;
    }
}

const reportByEventId = async (id) => {
    //we have to get all the expenses linked to the event
    //the goal is that we have a list of transactions from person to person with the amount

    //we have to keep a dictionary of the persons and the amount they have to pay or receive
    //initialise all the persons to 0
    const persons = await Person.findAll({ where: { EventId: id } });
    const personsDict = {};
    persons.forEach(person => {
        personsDict[person.name] = 0;
    });

    //we get all the expenses linked to the event
    const expenses = await Expense.findAll({ where: { EventId: id } });

    //for each expense we get all the persons linked to the expense
    //we add the value of the expense to the person who paid
    //we substract the value of the expense to the persons who received
    for (const expense of expenses) {
        const expensePersons = await ExpensePerson.findAll({
            where: { ExpenseId: expense.id },
            include: [{
                model: Person,
                attributes: ['name']
            }]
        });

        expensePersons.forEach(expensePerson => {
            // Convert the amount and value to Big objects
            const bigAmount = new Big(expense.amount);
            const bigValue = new Big(expensePerson.value);

            if (expense.splitType === SplitTypes.Percentage) {
                // Calculate the amount to substract using the big.js library
                const substractAmount = bigAmount.times(bigValue).div(100);
                personsDict[expensePerson.Person.name] = new Big(personsDict[expensePerson.Person.name]).minus(substractAmount).toNumber();
            } else {
                personsDict[expensePerson.Person.name] = new Big(personsDict[expensePerson.Person.name]).minus(bigValue).toNumber();
            }
        });

        const paidPerson = expensePersons.find(expensePerson => {
            return expensePerson.PersonId === expense.paidId;
        });
        // Convert the amount to a Big object
        const bigAmount = new Big(expense.amount);
        personsDict[paidPerson.Person.name] = new Big(personsDict[paidPerson.Person.name]).plus(bigAmount).toNumber();
    }

    //copy of the dictionary
    const personsDictCopy = { ...personsDict };

    //now we have the dictionary of the persons and the amount they have to pay or receive
    //we have to create the transactions
    const transactions = [];
    for (const person in personsDict) {
        if (personsDict[person] > 0) {
            for (const otherPerson in personsDict) {
                if (personsDict[otherPerson] < 0) {
                    const amount = Math.min(personsDict[person], -personsDict[otherPerson]);
                    if (amount === 0) continue;
                    transactions.push({
                        from: otherPerson,
                        to: person,
                        amount: amount
                    });
                    personsDict[person] = new Big(personsDict[person]).minus(amount).toNumber();
                    personsDict[otherPerson] = new Big(personsDict[otherPerson]).plus(amount).toNumber();
                }
            }
        }
    }

    // return {
    //     persons: personsDictCopy,
    //     transactions: transactions
    // };
    return transactions;
}


module.exports = {
    getById,
    getAllByUserId,
    searchByName,
    validate,
    validateExpense,
    getPinnedEvents,
    create,
    createExpenseByEventId,
    updateEventPinById,
    updateDetailsByEventId,
    updateExpenseByEventId,
    deleteEventById,
    deleteExpenseByEventId,
    reportByEventId
};