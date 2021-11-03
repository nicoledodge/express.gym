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
  res.render('login');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

router.get('/profile', async (req, res) => {
  // const bookedData = await Booked.findAll({
  //   where:{
  //     user_id: req.session.user_id
  //   },
  //   include: 
  //     [
  //       {
  //         model: Timeslot
  //       }
  //     ]
  // });

  // serialize bookedData
  // const booked = bookedData.map((book) => book.get({plain:true}));
  // console.log("booked data==============================================", booked);
  res.render('profile', {
    // send serialized bookedData to handlebar,
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