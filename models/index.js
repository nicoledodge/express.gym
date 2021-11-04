const User = require('./User');
const Activity = require('./Activity');
const Timeslot = require('./Timeslot');
const Booked = require('./Booked');
const Location = require('./Location');


User.belongsToMany(Timeslot, {
      foreignKey: 'user_id',
      through: {
        model: Booked,
        unique: false
      },
      as: 'booked_timeslots'
  });
  
Activity.hasMany(Timeslot, {
    foreignKey: 'activity_id',
  });

Timeslot.belongsTo(Activity,{
    foreignKey: 'activity_id',
});

Timeslot.belongsToMany(User,{
    foreignKey: 'timeslot_id',
    through: {
      model: Booked,
      unique: false
    },
    as: 'user_list'
})



module.exports = { User, Activity, Timeslot, Booked, Location };
