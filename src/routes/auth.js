const { Router } = require('express');
const { login , register  } = require('../controllers/auth');
const { postLoginRequestValidations,
        postRegisterRequestValidations } = require('../middlewares/auth');

const router = Router();

router.post('/register', postRegisterRequestValidations, register);
router.post('/login', postLoginRequestValidations, login);

module.exports = router;
