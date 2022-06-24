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
      name: 'Expenses aan zee',
      pinned: true,
      UserId: '58c6a897-7fda-4b85-b2ef-6d5e60762bcc',
      createdAt: '2022-06-11 11:25:43.000',
      updatedAt: '2022-06-11 11:25:43.000',
    },
    {
      id: '25b43388-a48c-42a8-a618-64aec81b50ac',
      name: 'Expenses in de Ardennen',
      UserId: '58c6a897-7fda-4b85-b2ef-6d5e60762bcc',
      createdAt: '2022-06-11 11:25:43.000',
      updatedAt: '2022-06-11 11:25:43.000',
      pinned: false,
    },
    {
      id: '8e956735-0ac8-4976-91a7-9b2ee4027e2f',
      name: 'Expenses aan zee',
      UserId: '36c6a897-7fda-4b85-b2ef-6d5e60762bcc',
      createdAt: '2022-06-11 11:25:43.000',
      updatedAt: '2022-06-11 11:25:43.000',
      pinned: false,
    },
    {
      id: 'f8500055-ea88-4906-abfb-29fcbae579e9',
      name: 'Exp in de something else',
      UserId: '58c6a897-7fda-4b85-b2ef-6d5e60762bcc',
      createdAt: '2022-06-11 11:25:43.000',
      updatedAt: '2022-06-11 11:25:43.000',
      pinned: false,
    },
    {
      id: 'c13f74b1-4a85-4707-bbae-3b7605a21c50',
      name: 'Expenses nog ergens anders',
      UserId: '58c6a897-7fda-4b85-b2ef-6d5e60762bcc',
      createdAt: '2022-06-11 11:25:43.000',
      updatedAt: '2022-06-11 11:25:43.000',
      pinned: false,
    },
    {
      id: '96d57838-2bf0-4a73-b317-d38c40462453',
      name: 'de deze waren niet in de Ardennen',
      UserId: '58c6a897-7fda-4b85-b2ef-6d5e60762bcc',
      createdAt: '2022-06-11 11:25:43.000',
      updatedAt: '2022-06-11 11:25:43.000',
      pinned: false,
    },
    {
      id: '54c92eca-460a-493a-b986-bc9e60a91830',
      name: 'barry in gent',
      UserId: '58c6a897-7fda-4b85-b2ef-6d5e60762bcc',
      createdAt: '2022-06-11 11:25:43.000',
      updatedAt: '2022-06-11 11:25:43.000',
      pinned: false,
    },
    {
      id: 'd53db28f-dd35-403a-b2ab-085fedadb52c',
      name: 'uitgaven antwerpen',
      UserId: '58c6a897-7fda-4b85-b2ef-6d5e60762bcc',
      createdAt: '2022-06-11 11:25:43.000',
      updatedAt: '2022-06-11 11:25:43.000',
      pinned: true,
    },
    {
      id: '64d798c8-8dda-4ffc-a147-2c724687d23e',
      name: 'rijs Italië',
      UserId: '58c6a897-7fda-4b85-b2ef-6d5e60762bcc',
      createdAt: '2022-06-11 11:25:43.000',
      updatedAt: '2022-06-11 11:25:43.000',
      pinned: false,
    },
    {
      id: '0676bded-3d68-4f15-ad72-3172dbe761a5',
      name: 'wereldreis',
      UserId: '58c6a897-7fda-4b85-b2ef-6d5e60762bcc',
      createdAt: '2022-06-11 11:25:43.000',
      updatedAt: '2022-06-11 11:25:43.000',
      pinned: true,
    },
    {
      id: 'a8b02475-609f-4675-9dbe-836f037cea5f',
      name: 'wereldreis 2.0',
      UserId: '58c6a897-7fda-4b85-b2ef-6d5e60762bcc',
      createdAt: '2022-06-11 11:25:43.000',
      updatedAt: '2022-06-11 11:25:43.000',
      pinned: false,
    },
    {
      id: '9842b1c1-b75d-4d11-8406-55fe7f7eccf6',
      name: "reis naar de bahama's",
      UserId: '58c6a897-7fda-4b85-b2ef-6d5e60762bcc',
      createdAt: '2022-06-11 11:25:43.000',
      updatedAt: '2022-06-11 11:25:43.000',
      pinned: true,
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
    await queryInterface.bulkDelete('event', null, {});
  }
};
