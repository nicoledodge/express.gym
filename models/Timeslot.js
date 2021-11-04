// Session: instructor, time, capacity, location
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Timeslot extends Model {}

Timeslot.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    instructor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 10,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'TBD'
    },
    activity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'activity',
          key: 'id',
          unique: false
        },
      }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'timeslot',
  }
);

module.exports = Timeslot;