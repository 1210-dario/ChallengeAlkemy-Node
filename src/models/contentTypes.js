const { DataTypes } = require('sequelize');
const sequelize = require('../loaders/sequelize');

const ContentType = sequelize.define('ContentType', {
  // Model attributes are defined here
  description: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  timestamps: false
  // Other model options go here
});

module.exports = ContentType;

const Movie = require('./movies');
ContentType.hasMany(Movie, {
    as: 'movies',
    foreignKey: "contentTypeId"
});


