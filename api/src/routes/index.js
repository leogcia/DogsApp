const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRoute = require('./DogsRoute');
const temperamentRoute = require('./TemperamentRoute')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dog', dogRoute);
router.use('/temperament', temperamentRoute);


module.exports = router;
