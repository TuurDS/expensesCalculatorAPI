const eventRepository = require("../repository/event");
const ServiceError = require("../core/serviceError");

const getAllByUserId = async (userId) => {
    try {
        return await eventRepository.getAllByUserId(userId);
    } catch (error) {
        throw ServiceError.notFound("event not found");
    }
};

const getById = async (id) => {
    try {
        return await eventRepository.getById(id);
    } catch (error) {
        throw ServiceError.notFound("event not found");
    }
};

const getPinnedEvents = async (userId) => {
    try {
        return await eventRepository.getPinnedEvents(userId);
    } catch (error) {
        throw ServiceError.notFound("event not found");
    }
};

const searchEventByName = async (name, userId) => {
    try {
        return await eventRepository.searchByName(name, userId);
    } catch (error) {
        throw ServiceError.notFound("event not found");
    }
};


const updateEventPinById = async (object, userId) => {
    if (await eventRepository.validate(object.id, userId)) {
        await eventRepository.updateEventPinById(object);
        return { message: "Event pinned successfully", status: 200 }
    }
    throw ServiceError.unauthorized("you are not authorized to update this event");
};


const create = async (userId) => {
    try {
        const event = await eventRepository.create(userId);
        return { message: "Event created successfully", eventId: event.id, status: 200 }
    } catch (error) {
        throw ServiceError.validationFailed("error while creating event");
    }
};

const updateDetailsByEventId = async (object, userId) => {
    try {
        if (await eventRepository.validate(object.id, userId)) {
            await eventRepository.updateDetailsByEventId(object);
            return { message: "Event details updated successfully", status: 200 };
        }
        throw ServiceError.unauthorized("you are not authorized to update the details of this event");
    } catch (error) {
        throw ServiceError.validationFailed("error while updating event");
    }
};

const updateExpenseByEventId = async (object, userId) => {
    try {
        if (await eventRepository.validateExpense(object.id, userId)) {
            await eventRepository.updateExpenseByEventId(object);
            return { message: "Event expense updated successfully", status: 200 };
        }
        throw ServiceError.unauthorized("you are not authorized to update the expense of this event");
    } catch (error) {
        throw ServiceError.validationFailed("error while updating event");
    }
};

const deleteEventById = async (id, userId) => {
    try {
        if (await eventRepository.validate(id, userId)) {
            await eventRepository.deleteEventById(id);
            return { message: "Event deleted successfully", status: 200 };
        }
        throw ServiceError.unauthorized("you are not authorized to delete this event");
    } catch (error) {
        throw ServiceError.validationFailed("error while deleting event");
    }
};

const createExpenseByEventId = async (id, userId) => {
    try {
        if (await eventRepository.validate(id, userId)) {
            const expense = await eventRepository.createExpenseByEventId(id);
            return { message: "Expense created successfully", expenseId: expense.id, status: 200 };
        }
        throw ServiceError.unauthorized("you are not authorized to create expense for this event");
    } catch (error) {
        throw ServiceError.validationFailed("error while creating expense");
    }
};

const deleteExpenseByEventId = async (id, userId) => {
    try {
        if (await eventRepository.validateExpense(id, userId)) {
            await eventRepository.deleteExpenseByEventId(id);
            return { message: "Expense deleted successfully", status: 200 };
        }
        throw ServiceError.unauthorized("you are not authorized to delete this expense");
    } catch (error) {
        throw ServiceError.validationFailed("error while deleting expense");
    }
};

const reportByEventId = async (id, userId) => {
    try {
        if (await eventRepository.validate(id, userId)) {
            const report = await eventRepository.reportByEventId(id);
            return report;
        }
        throw ServiceError.unauthorized("you are not authorized to generate report for this event");
    } catch (error) {
        throw ServiceError.validationFailed("error while generating report");
    }
};


module.exports = {
    getAllByUserId,
    getById,
    searchEventByName,
    getPinnedEvents,
    updateEventPinById,
    create,
    updateDetailsByEventId,
    updateExpenseByEventId,
    deleteEventById,
    createExpenseByEventId,
    deleteExpenseByEventId,
    reportByEventId
};
