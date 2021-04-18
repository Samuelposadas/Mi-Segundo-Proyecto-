var express = require('express');
var router = express.Router();
var pool = require('../bd');
var mail = require('../mail')

/* GET home page. */
router.get('/', async function(req, res, next) {
 
  let frutas = await pool.query('select * from frutas')

  let jugos = await pool.query('select * from jugos')


  res.render('index',{data : frutas , datos:jugos});
});

router.post('/', async function (req,res,next){

    let infoForm = ` Nombre: ${req.body.nombre} \Email: ${req.body.email} \Numero: ${req.body.numero} \Texto: ${req.body.texto} `

     let info= await mail.main(infoForm);


    res.render('mensajeMail',{mensaje:"Mail enviado exitosamente!! , apreta el boton retornar para volver."});
})

module.exports = router;