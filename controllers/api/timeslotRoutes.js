const router = require('express').Router();
const { User, Timeslot } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newTimeslot = await Timeslot.create(req.body);
    
    if (!newTimeslot) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
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

router.get('/timeslot/:id',  async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      
      include: [{ model: Timeslot } ],
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