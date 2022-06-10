'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
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
      uuid: '58c6a897-7fda-4b85-b2ef-6d5e60762bcc',
      name: 'John Doe',
      role: 'admin',
      createdAt: '2022-06-10 11:52:43.000',
      updatedAt: '2022-06-10 11:52:43.000',
    },{
      uuid: '36c6a897-7fda-4b85-b2ef-6d5e60762bcc',
      name: 'Kyle Doe',
      role: 'user',
      createdAt: '2022-06-10 11:52:43.000',
      updatedAt: '2022-06-10 11:52:43.000',
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('user', null, {});
  }
};
