const { Router } = require('express');
const router = Router();
const { getTemps } = require('../Controllers/TemperamentControl');


router.get('/', getTemps)

module.exports = router;