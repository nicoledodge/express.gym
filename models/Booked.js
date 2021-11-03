const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Trip model
class Booked extends Model {}

// create fields/columns for Trip model
Booked.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allwoNull: false,
      references: {
        model: 'user',
        key: 'id',
        unique: false
      }
    },
    timeslot_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'timeslot',
        key: 'id',
        unique: false
      }
    }
    // add a capacity column that auto increments with every creation and has a validation that checks if the capacity is over 20
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'booked'
  }
);

module.exports = Booked;
