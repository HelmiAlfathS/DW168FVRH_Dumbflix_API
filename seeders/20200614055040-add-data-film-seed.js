'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('films', [
      {
        title: 'Interstellar',
        thumbnailFilm: 'interstellar.jpg',
        year: 2014,
        categoryId: 1,
        description:
          'Eksplorasi manusia untuk mencari tempat kehidupan baru di luar angkasa',
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
