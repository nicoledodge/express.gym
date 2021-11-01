const User = require('./User');
const Activity = require('./Activity')
const Timeslot = require('./Timeslot')


User.belongsToMany(Timeslot, {
      foreignKey: 'timeslot_id',
      through: 'booked_sessions'
  });
  
Activity.hasMany(Timeslot, {
    foreignKey: 'activity_id',
  });

Timeslot.belongsTo(Activity,{
    foreignKey: 'activity_id',
});

Timeslot.belongsToMany(User,{
    foreignKey: 'user_id',
    through: 'booked_sessions',
})



module.exports = { User, Activity, Timeslot };
