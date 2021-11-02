const router = require('express').Router();
const { User, Timeslot } = require('../../models');

router.post('/timeslot', async (req, res) => {
  try {
    const timeslotData = await Timeslot.create(req.body);

    res.status(200).json(timeslotData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/timeslot/:id', async (req, res) => {
    // Calls the update method on the Book model
  Timeslot.update(
    {
      instructor: req.body.instructor,
      time: req.body.time,
      capacity: req.body.capacity,
      location: req.body.location,
      user_id: req.body.user_id
    },
    {
      // Gets the books based on the isbn given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedBook) => {
      // Sends the updated book as a json response
      res.json(updatedBook);
    })
    .catch((err) => res.json(err));
});

module.exports = router;