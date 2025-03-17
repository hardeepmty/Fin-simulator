const express = require('express');

const router = express.Router();

const GetUserController = require('../controllers/user/get');
const middleware = require('../middlewares/user');



router.get('/user', middleware, GetUserController.getUser);


module.exports = router;
