const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    phone_number:{
      type: DataTypes.STRING,
      allowNull: false,

    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [5,5],
      },
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      validate:{
        isDate: true,
      }
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        // check for is old enough and then set a validator constant
        let ageCheck = new Date();
        ageCheck.setFullYear(ageCheck.getFullYear() - 18);
        let birthDate = new Date(newUserData.date_of_birth);
        if ((ageCheck < birthDate)) {
          throw new Error('Invalid age.');
        } else if(newUserData.zipcode.length !== 5){
          throw new Error('Invalid location.');
        } else if(newUserData.password.length < 8) {
          throw new Error('Invalid password length.');
        } else {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;  
        }
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
