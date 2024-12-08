var express = require('express');
var router = express.Router();
const ContactosController = require('../controllers/ContactosController');

/* GET home page. */
router.post('/add', ContactosController.add);

module.exports = router;
