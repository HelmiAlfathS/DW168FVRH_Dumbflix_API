'use strict';
module.exports = (sequelize, DataTypes) => {
  const Films = sequelize.define(
    'Films',
    {
      title: DataTypes.STRING,
      thumbnailFilm: DataTypes.STRING,
      year: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {}
  );
  Films.associate = function (models) {
    Films.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category',
      onDelete: 'CASCADE',
    }),
      Films.hasMany(models.Episode, {
        as: 'episode',
      });
  };
  return Films;
};
