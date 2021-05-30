const { DataTypes } = require('sequelize');
const sequelize = require('../loaders/sequelize');


const GenderType = sequelize.define('GenderType', {
  // Model attributes are defined here
  description: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  timestamps: false
  // Other model options go here
});

module.exports = GenderType;

const Movie = require('./movies');
GenderType.hasMany(Movie, {
  foreignKey: 'genderTypeId',
  sourceKey: 'id'
});

