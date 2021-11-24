const router = require('express-promise-router')();
const { check } = require('express-validator')
const { auth } = require('../controllers');

router.route('/login').post(auth.login);
router.route('/signup').post(
  [
    check('email', 'email is uncorrected').notEmpty(),
    check('password', 'password must be bigger then 4 symbols').isLength({ min: 4, max: 20 })
  ],
  auth.signUp
);
router.route('/refresh').post(auth.refreshTokenUse);

module.exports = router