const router = require('express').Router();
const { User, Timeslot, Booked } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/:id',  async (req, res) => {
    try {
      const timeslotData = await Timeslot.findOne({ where: { id: req.params.id } });
      if (!timeslotData) {
        res
          .status(400)
          .json({ message: "Timeslot doesn't exist" });
        return;
      }
        const newBooked = await Booked.create({
          timeslot_id: req.params.id,
        //   Change to req.session.user_id
          user_id: req.body.user_id,
        });
        res.status(200).json(newBooked);
      } catch (err) {
      console.log("catch firing");
      res.status(400).json(err);
    }
});

router.get('/',  async (req, res) => {
  try {
    const activityData = await Booked.findAll();

    if (!activityData) {
    res.status(404).json({ message: 'No timeslot found with that id!' });
    return;
    }

    res.status(200).json(activityData);
} catch (err) {
    res.status(500).json(err);
}
});

  module.exports = router;
