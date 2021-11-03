const router = require('express').Router();
const {
  Activity,
  Timeslot
} = require('../models');

router.get('/', async (req, res) => {
  try {
    const activityData = await Activity.findAll({
      include: [{
        model: Timeslot,
        // as: 'timeslot'
      }]
    });
    // const timeslotData = await Timeslot.findAll({
    //   where: {
    //     activity_id: activityData[0].id
    //   }
    // });
    // const timeslots = timeslotData.map((timeslot) => timeslot.get({plain:true}));
    const activities = activityData.map((activity) => activity.get({
      plain: true
    }));
    console.log('activities-----------------------------------------------------------------------', activities);
    // for(let i = 0; i<activities.length; i++) {
    //   console.log('for loop firing');
    //   for(let j = 0; i<activities[i].timeslots.length; j++) {
    //     timeslots.push(activities[i].timeslots[j]);
    //   }
    // }
    // console.log(timeslots);
    res.render('homepage', {
      activities,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id
    });
    // res.status(200).json(activityData);
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
  res.render('profile', {
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