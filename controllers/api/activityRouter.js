const router = require('express').Router();
const { User, Activity, Timeslot } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/',  async (req, res) => {
    try {
        const activityData = await Activity.findAll({
            include: [{ model: Timeslot} ]
          });

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