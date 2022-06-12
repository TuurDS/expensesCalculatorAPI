'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('expensePerson', [{
      PersonId: '9c0cce0d-b5ce-433e-bc01-660386d4cb34',
      ExpenseId: '9cec2708-7f10-4b0f-b929-6396e17597c9',
      percentage: 0.25,
      amount: null,
      createdAt: '2022-06-12 11:25:43.000',
      updatedAt: '2022-06-12 11:25:43.000',
    }, {
      PersonId: 'd9f231d7-5ba1-4795-a4fd-ff1bbfdf418d',
      ExpenseId: '9cec2708-7f10-4b0f-b929-6396e17597c9',
      percentage: 0.25,
      amount: null,
      createdAt: '2022-06-12 11:25:43.000',
      updatedAt: '2022-06-12 11:25:43.000',
    },
    {
      PersonId: '61327e0f-b4fb-490c-9f46-78237807a3de',
      ExpenseId: '9cec2708-7f10-4b0f-b929-6396e17597c9',
      percentage: 0,
      amount: null,
      createdAt: '2022-06-12 11:25:43.000',
      updatedAt: '2022-06-12 11:25:43.000',
    },
    {
      PersonId: '8728e70c-6382-4b56-9b38-3a6b1096cf1b',
      ExpenseId: '9cec2708-7f10-4b0f-b929-6396e17597c9',
      percentage: 0.25,
      amount: null,
      createdAt: '2022-06-12 11:25:43.000',
      updatedAt: '2022-06-12 11:25:43.000',
    },
    {
      PersonId: 'd7dd9246-98b5-402d-bcb6-1d57940e62b4',
      ExpenseId: '9cec2708-7f10-4b0f-b929-6396e17597c9',
      percentage: 0.25,
      amount: null,
      createdAt: '2022-06-12 11:25:43.000',
      updatedAt: '2022-06-12 11:25:43.000',
    },
    // expense 2
    {
      PersonId: '9c0cce0d-b5ce-433e-bc01-660386d4cb34',
      ExpenseId: '351cbde5-ea1c-4e2b-be98-835e4a37f8dc',
      percentage: null,
      amount: 6.8,
      createdAt: '2022-06-12 11:25:43.000',
      updatedAt: '2022-06-12 11:25:43.000',
    }, {
      PersonId: 'd9f231d7-5ba1-4795-a4fd-ff1bbfdf418d',
      ExpenseId: '351cbde5-ea1c-4e2b-be98-835e4a37f8dc',
      percentage: null,
      amount: 8.3,
      createdAt: '2022-06-12 11:25:43.000',
      updatedAt: '2022-06-12 11:25:43.000',
    },
    {
      PersonId: '61327e0f-b4fb-490c-9f46-78237807a3de',
      ExpenseId: '351cbde5-ea1c-4e2b-be98-835e4a37f8dc',
      percentage: null,
      amount: 5.5,
      createdAt: '2022-06-12 11:25:43.000',
      updatedAt: '2022-06-12 11:25:43.000',
    },
    {
      PersonId: '8728e70c-6382-4b56-9b38-3a6b1096cf1b',
      ExpenseId: '351cbde5-ea1c-4e2b-be98-835e4a37f8dc',
      percentage: null,
      amount: 5.6,
      createdAt: '2022-06-12 11:25:43.000',
      updatedAt: '2022-06-12 11:25:43.000',
    },
    {
      PersonId: 'd7dd9246-98b5-402d-bcb6-1d57940e62b4',
      ExpenseId: '351cbde5-ea1c-4e2b-be98-835e4a37f8dc',
      percentage: null,
      amount: 7.2,
      createdAt: '2022-06-12 11:25:43.000',
      updatedAt: '2022-06-12 11:25:43.000',
    },
    //expense 3
    {
      PersonId: '9c0cce0d-b5ce-433e-bc01-660386d4cb34',
      ExpenseId: '209880fb-9f30-446a-9ff8-dd4e4ca35455',
      percentage: 0.20,
      amount: null,
      createdAt: '2022-06-12 11:25:43.000',
      updatedAt: '2022-06-12 11:25:43.000',
    }, {
      PersonId: 'd9f231d7-5ba1-4795-a4fd-ff1bbfdf418d',
      ExpenseId: '209880fb-9f30-446a-9ff8-dd4e4ca35455',
      percentage: 0.20,
      amount: null,
      createdAt: '2022-06-12 11:25:43.000',
      updatedAt: '2022-06-12 11:25:43.000',
    },
    {
      PersonId: '61327e0f-b4fb-490c-9f46-78237807a3de',
      ExpenseId: '209880fb-9f30-446a-9ff8-dd4e4ca35455',
      percentage: 0.20,
      amount: null,
      createdAt: '2022-06-12 11:25:43.000',
      updatedAt: '2022-06-12 11:25:43.000',
    },
    {
      PersonId: '8728e70c-6382-4b56-9b38-3a6b1096cf1b',
      ExpenseId: '209880fb-9f30-446a-9ff8-dd4e4ca35455',
      percentage: 0.20,
      amount: null,
      createdAt: '2022-06-12 11:25:43.000',
      updatedAt: '2022-06-12 11:25:43.000',
    },
    {
      PersonId: 'd7dd9246-98b5-402d-bcb6-1d57940e62b4',
      ExpenseId: '209880fb-9f30-446a-9ff8-dd4e4ca35455',
      percentage: 0.20,
      amount: null,
      createdAt: '2022-06-12 11:25:43.000',
      updatedAt: '2022-06-12 11:25:43.000',
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('expensePerson', null, {});
  }
};
