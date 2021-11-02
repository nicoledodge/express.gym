const router = require('express').Router();
const userRoutes = require('./userRoutes');
const timeslotRoutes = require('./timeslotRoutes');
const bookedRoutes = require('./bookedRoutes');

router.use('/users', userRoutes);

router.use('/timeslot', timeslotRoutes);

router.use('/booked', bookedRoutes);

module.exports = router;
