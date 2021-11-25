const { Router } = require('express');
const { getDogs, postDog, getDogById } = require('../Controllers/DogControl');
const router = Router();


router.get('/', getDogs)
router.get('/:id', getDogById)
router.post('/', postDog)


module.exports = router;

