const router = require('express').Router();
const { User, Timeslot, Booked, Activity } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body, {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      date_of_birth: req.body.date_of_birth,
      password: req.body.password,
      zipcode: req.body.zipcode
    });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
    try {
      // console.log(req.body.email);
      const userData = await User.findOne({ where: { email: req.body.email } });
      
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
      // console.log(validPassword);
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.status(200).json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      console.log("catch firing");
      res.status(400).json(err);
    }
  });

  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  router.get('/user-timeslot/', withAuth, async (req, res) => {
    try {//for testing add req.params.id for functioning add req.session.user_id
      const userData = await User.findByPk(req.session.user_id, {
        
        include: [{ model: Timeslot, through: Booked, as: 'booked_timeslots', include: [{model: Activity}] } ]
      });
  
      if (!userData) {
        res.status(404).json({ message: 'No reader found with that id!' });
        return;
      }
  
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;
  