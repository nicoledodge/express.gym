const router = require('express').Router();
const {
  Activity,
  Timeslot,
  Booked,
  User
} = require('../models');

router.get('/home/:date', async (req, res)=> {

});

router.get('/', async (req, res) => {
  try {
    const activityData = await Activity.findAll({
      include: [{
        model: Timeslot,
      }]
    });

    const activities = activityData.map((activity) => activity.get({
      plain: true
    }));

    res.render('homepage', {
      activities,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id
    });

  } catch (err) {
    res.status(500).json(err);
  }
  // Send the rendered Handlebars.js template back as the response

});

router.get('/login', async (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

router.get('/profile', async (req, res) => {

  try {
    const bookedData = await Booked.findAll({
      attributes: {exclude: ['password']},
      where: {
        user_id: req.session.user_id
      },
      include:
          [
            {
              model: Timeslot
            }
          ]
    });
    const booked = bookedData.map((project) => project.get({plain: true}));
    // serialize bookedData
    res.render('profile', {booked,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});
// send serialized bookedData to handlebar,

router.get('/amenities', async (req, res) => {
  res.render('amenities', {
    logged_in: req.session.logged_in,
    user_id: req.session.user_id
  });
});

module.exports = router;