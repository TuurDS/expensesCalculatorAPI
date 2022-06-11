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
    await queryInterface.bulkInsert('event', [{
      id: 'ee22c4f1-e86e-4fc0-99d1-f3f639667350',
      name: 'expenses aan zee',
      UserId: '58c6a897-7fda-4b85-b2ef-6d5e60762bcc',
      createdAt: '2022-06-11 11:25:43.000',
      updatedAt: '2022-06-11 11:25:43.000',
    }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('event', null, {});
  }
};
