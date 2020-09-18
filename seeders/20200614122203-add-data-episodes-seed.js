'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('episodes', [
      {
        title: 'Game of Throne : Episode 1',
        thumbnailFilm: 'got1.jpg',
        linkFilm: 'https://www.youtube.com/watch?v=O1K3NsOG1Fc',
        filmId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Game of Throne : episode 2',
        thumbnailFilm: 'got2.jpg',
        linkFilm: 'https://www.youtube.com/watch?v=O1K3NsOG1Fc',
        filmId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
