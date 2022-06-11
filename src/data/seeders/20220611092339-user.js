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
    await queryInterface.bulkInsert('user', [{
      id: '58c6a897-7fda-4b85-b2ef-6d5e60762bcc',
      name: 'admin',
      password: '12345678',
      role: 'admin',
      createdAt: '2022-06-10 11:52:43.000',
      updatedAt: '2022-06-10 11:52:43.000',
    }, {
      id: '36c6a897-7fda-4b85-b2ef-6d5e60762bcc',
      name: 'user',
      password: '12345678',
      role: 'user',
      createdAt: '2022-06-11 11:25:43.000',
      updatedAt: '2022-06-11 11:25:43.000',
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
    await queryInterface.bulkDelete('user', null, {});
  }
};
