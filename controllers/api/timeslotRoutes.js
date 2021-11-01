const router = require('express').Router();
const { User } = require('../../models');

router.post('/session', async (req, res) => {
  try {
    const timeslotData = await Session.create(req.body);

    res.status(200).json(timeslotData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/timeslot', async (req, res) => {

});

module.exports = router;