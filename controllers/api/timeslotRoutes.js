const router = require('express').Router();
const {
  User,
  Activity,
  Timeslot,
  Booked
} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newTimeslot = await Timeslot.create(req.body);

    if (!newTimeslot) {
      res
        .status(400)
        .json({
          message: 'Incorrect email or password, please try again'
        });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({
          message: 'Incorrect email or password, please try again'
        });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json({
        user: userData,
        message: 'You are now logged in!'
      });
    });

  } catch (err) {
    console.log("catch firing");
    res.status(400).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const timeslotData = await Timeslot.findAll({
      include: [{
        model: Activity
      }]
    });

    if (!timeslotData) {
      res.status(404).json({
        message: 'No timeslot found with that id!'
      });
      return;
    }

    res.status(200).json(timeslotData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/:id', withAuth, async (req, res) => {
  try {
    const timeslotData = await Timeslot.findByPk(req.params.id);
    if (!timeslotData) {
      res
        .status(404)
        .json({
          message: "Timeslot doesn't exist"
        });
      return;
    }
    const existingBooked = await Booked.findOne({
      where: {
        user_id: req.session.user_id,
        timeslot_id: req.params.id
      },
    });
    if (existingBooked) {
      res.status(400).json({
        "message": "You are already signed up for this class!"
      });
      return;
    }
    const newBooked = await Booked.create({
      timeslot_id: parseInt(req.params.id),
      //   Change to req.session.user_id
      user_id: req.session.user_id,
    });
    res.status(200).json(newBooked);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// router.put('/timeslot/:id', async (req, res) => {
//     // Calls the update method on the Book model
//   Timeslot.update(
//     {
//       instructor: req.body.instructor,
//       time: req.body.time,
//       capacity: req.body.capacity,
//       location: req.body.location,
//       user_id: req.body.user_id
//     },
//     {
//       // Gets the books based on the isbn given in the request parameters
//       where: {
//         id: req.params.id,
//       },
//     }
//   )
//     .then((updatedBook) => {
//       // Sends the updated book as a json response
//       res.json(updatedBook);
//     })
//     .catch((err) => res.json(err));
// });



module.exports = router;