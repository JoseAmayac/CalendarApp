const router = require('express').Router();

const EventsController = require('../controllers/EventsController');

const { validateJWT } = require('../middlewares/validatejwt');
const { eventValidations } = require('../middlewares/validators');
const { checkErrors } = require('../middlewares/checkError');

router.use( validateJWT );

router.get('/', EventsController.getEvents);
router.post('/', [ eventValidations, checkErrors ],  EventsController.createEvent);
router.put('/:id',EventsController.updateEvent);
router.delete('/:id',EventsController.deleteEvent);

module.exports = router;