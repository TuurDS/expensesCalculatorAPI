'use strict';
const SplitTypes = require('../splitTypes');

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
    await queryInterface.bulkInsert('expense', [{
      id: '9cec2708-7f10-4b0f-b929-6396e17597c9',
      description: 'voorshot 2 keer karting + hoogteparkour',
      amount: 60.00,
      date: '2022-06-12 11:25:43.000',
      splitType: SplitTypes.Percentage,
      EventId: 'ee22c4f1-e86e-4fc0-99d1-f3f639667350',
      PaidId: '9c0cce0d-b5ce-433e-bc01-660386d4cb34',
      PersonId: '9c0cce0d-b5ce-433e-bc01-660386d4cb34',
      createdAt: '2022-06-12 11:25:43.000',
      updatedAt: '2022-06-12 11:25:43.000',
    },
    {
      id: '351cbde5-ea1c-4e2b-be98-835e4a37f8dc',
      description: 'café',
      amount: 33.40,
      date: '2022-06-12 11:25:43.000',
      splitType: SplitTypes.Amount,
      EventId: 'ee22c4f1-e86e-4fc0-99d1-f3f639667350',
      PaidId: 'd7dd9246-98b5-402d-bcb6-1d57940e62b4',
      PersonId: 'd7dd9246-98b5-402d-bcb6-1d57940e62b4',
      createdAt: '2022-06-12 11:25:43.000',
      updatedAt: '2022-06-12 11:25:43.000',
    },
    {
      id: '209880fb-9f30-446a-9ff8-dd4e4ca35455',
      description: 'bowlingbaan voorschot',
      amount: 10.00,
      date: '2022-06-12 11:25:43.000',
      splitType: SplitTypes.Equal,
      EventId: 'ee22c4f1-e86e-4fc0-99d1-f3f639667350',
      PaidId: '9c0cce0d-b5ce-433e-bc01-660386d4cb34',
      PersonId: '9c0cce0d-b5ce-433e-bc01-660386d4cb34',
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
    await queryInterface.bulkDelete('expense', null, {});
  }
};
