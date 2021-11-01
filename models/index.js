const User = require('./User');
const Activity = require('./Activity')
const Session = require('./Session')

User.hasMany(Activity, {
    foreignKey: 'user_id',
  });
  
Activity.belongsTo(User, {
    foreignKey: 'user_id',
  });

Session.belongsTo(Activity,{
    foreignKey: session_
})

module.exports = { User, Activity, Session };
