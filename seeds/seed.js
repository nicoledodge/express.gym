const sequelize = require('../config/connection');
const { User,Timeslot,Activity, Location } = require('../models');

const userData = require('./userData.json');

const timeslotData = require('./timeslotData.json');
const activityData = require('./activityData.json');
const locationData = require('./locationData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Activity.bulkCreate(activityData, {
    individualHooks: true,
    returning: true,
  });

  await Timeslot.bulkCreate(timeslotData, {
    individualHooks: true,
    returning: true,
  });

  await Location.bulkCreate(locationData)

  process.exit(0);
};

seedDatabase();
