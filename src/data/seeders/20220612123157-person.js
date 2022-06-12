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
    await queryInterface.bulkInsert('person', [{
      id: '9c0cce0d-b5ce-433e-bc01-660386d4cb34',
      name: 'Tuur',
      EventId: 'ee22c4f1-e86e-4fc0-99d1-f3f639667350',
      createdAt: '2022-06-12 11:25:43.000',
      updatedAt: '2022-06-12 11:25:43.000',
    }, {
      id: 'd9f231d7-5ba1-4795-a4fd-ff1bbfdf418d',
      name: 'Jitse',
      EventId: 'ee22c4f1-e86e-4fc0-99d1-f3f639667350',
      createdAt: '2022-06-12 11:25:43.000',
      updatedAt: '2022-06-12 11:25:43.000',
    },
    {
      id: '61327e0f-b4fb-490c-9f46-78237807a3de',
      name: 'Jonathan',
      EventId: 'ee22c4f1-e86e-4fc0-99d1-f3f639667350',
      createdAt: '2022-06-12 11:25:43.000',
      updatedAt: '2022-06-12 11:25:43.000',
    },
    {
      id: '8728e70c-6382-4b56-9b38-3a6b1096cf1b',
      name: 'Arne',
      EventId: 'ee22c4f1-e86e-4fc0-99d1-f3f639667350',
      createdAt: '2022-06-12 11:25:43.000',
      updatedAt: '2022-06-12 11:25:43.000',
    },
    {
      id: 'd7dd9246-98b5-402d-bcb6-1d57940e62b4',
      name: 'Tibbe',
      EventId: 'ee22c4f1-e86e-4fc0-99d1-f3f639667350',
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
    await queryInterface.bulkDelete('person', null, {});
  }
};
