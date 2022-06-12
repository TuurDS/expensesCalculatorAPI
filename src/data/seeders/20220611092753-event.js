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
    },
    {
      id: '25b43388-a48c-42a8-a618-64aec81b50ac',
      name: 'expenses in de Ardennen',
      UserId: '58c6a897-7fda-4b85-b2ef-6d5e60762bcc',
      createdAt: '2022-06-11 11:25:43.000',
      updatedAt: '2022-06-11 11:25:43.000',
    },
    {
      id: '8e956735-0ac8-4976-91a7-9b2ee4027e2f',
      name: 'expenses aan zee',
      UserId: '36c6a897-7fda-4b85-b2ef-6d5e60762bcc',
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
