const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  // Method to compare hashed and inputed password
  async checkPassword(loginPw) {
    return bcrypt.compare(loginPw, this.password);
  }
}
// Set up user model
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
    // It needs to be formated as month/day/year and slashes or dashes ok.
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate:{
        isDate: true,
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10,10],
        isNumeric: true
      },
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,5],
        isNumeric: true
      },
    },
    is_VIP: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
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
         } else if(newUserData.phone_number.length !== 10){
            throw new Error('Invalid phone number.');
        } else if(newUserData.password.length < 8) {
          throw new Error('Invalid password length.');
        } else {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;  
        }
      },
      beforeUpdate: async (updatedUserData) => {
        if (updatedUserData.password) {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          }
          return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
