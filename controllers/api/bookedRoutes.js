const router = require('express').Router();
const {
  User,
  Timeslot,
  Booked
} = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/:id', withAuth, async (req, res) => {
  try {
    const timeslotData = await Timeslot.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!timeslotData) {
      res.status(400).json({
          message: "Timeslot doesn't exist"
        });
      return;
    }
    // const bookedData = await Booked.findAll()
    const newBooked = await Booked.create({
      timeslot_id: req.params.id,
      //   Change to req.session.user_id
      user_id: req.session.user_id,
    });
    res.status(200).json(newBooked);
  } catch (err) {
    console.log("catch firing");
    res.status(400).json(err);
  }
});

module.exports = router;