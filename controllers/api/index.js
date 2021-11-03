const router = require('express').Router();
const userRoutes = require('./userRoutes');
const timeslotRoutes = require('./timeslotRoutes');

router.use('/users', userRoutes);

router.use('/timeslot', timeslotRoutes);

module.exports = router;
