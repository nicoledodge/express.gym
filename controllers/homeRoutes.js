const router = require('express').Router();
const withAuth = require('../utils/auth');
const {
  Activity,
  Timeslot,
  Booked,
  User,
  Location
} = require('../models');

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

    const locationData = await Location.findOne();
    const location = locationData.get({plain: true});

    res.render('homepage', {
      activities,
      location,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id
    });

  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/locations', async (req, res) => {
  res.render('locations', {
    logged_in: req.session.logged_in,
    user_id: req.session.user_id
  })
})

router.get('/login', async (req, res) => {

  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

router.get('/vip', async (req, res) => {
  res.render('vip', {
    logged_in: req.session.logged_in,
    user_id: req.session.user_id
  });
});

router.get('/profile', withAuth, async (req, res) => {

  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{
        model: Timeslot,
        through: Booked,
        as: 'booked_timeslots',
        include: [{
          model: Activity
        }]
      }]
    });
    const user = await userData.get({plain:true});

    if (!userData) {
      res.status(404).json({
        message: 'No user found with that id!'
      });
      return;
    }
    res.render('profile', {
      user,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});

router.get('/forgotpassword', async(req, res) => {
  res.render('reset',{
    logged_in: req.session.logged_in,
    user_id: req.session.user_id
  });
});

router.get('/amenities', async (req, res) => {
  res.render('amenities', {
    logged_in: req.session.logged_in,
    user_id: req.session.user_id
  });
});

module.exports = router;