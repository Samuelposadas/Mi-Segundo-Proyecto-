var express = require('express');
var router = express.Router();
var pool = require('../bd')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  // res.render('respond with a resource');

  let sentencia = await pool.query('select * from frutas_jugos')

  // res.status(201).json(sentencia)

});

module.exports = router;
