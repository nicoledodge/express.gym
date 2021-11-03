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
    // console.log('activities-----------------------------------------------------------------------', activities[0].timeslots);
    // const activities = activity.map((item) => {
    //   for(let i = 0; i<item.timeslots.length; i++){
    //     console.log("MOMENT FORMATTED TIME===================================================", moment(item.timeslots[i].time, 'HH:mm:ss').format('h:mm A')); 
    //   }
    //   return item
    // });

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