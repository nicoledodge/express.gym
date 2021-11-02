const router = require('express').Router();

router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('homepage', {
    logged_in: req.session.logged_in,
    user_id: req.session.user_id
  });
});

router.get('/login', async (req, res) => {
  res.render('login');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

router.get('/profile', async (req, res) => {
  res.render('profile', {logged_in: req.session.logged_in, user_id: req.session.user_id});
});

module.exports = router;
