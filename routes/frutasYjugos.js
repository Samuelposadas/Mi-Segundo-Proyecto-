var express = require('express');
var router = express.Router();
var pool = require('../bd');
var multer  = require('multer');
var upload = multer({ dest: './uploads/' });
var fs = require('fs');

/* GET users listing. */
router.get('/1_administrador/', async function(req, res, next) {

  let fyj = await pool.query('select * from fyj')

  res.render('1_administrador',{dato:fyj});
});


router.get('/alta/', async function(req, res, next) {

  res.render('2_formularioAlta');
});

router.post('/alta/', upload.single('imagen'),async function(req, res, next) {

    let insert = `insert into fyj (nombre,descripcion,imagen) values('${req.body.nombre}','${req.body.descripcion}','/images/${req.file.originalname}')`;

    let resultado = await pool.query(insert);

    fs.createReadStream('./uploads/'+req.file.filename).pipe(fs.createWriteStream('./public/images/'+req.file.originalname, function(error){}));
    //borramos el archivo temporal creado
    fs.unlink('./uploads/'+req.file.filename, function(error){});

  res.render('finalizado' ,{mensaje:'imagen ingresada correctamente'});
});


router.get('/modificar/:id', async function(req, res, next) {

  let modificar = await pool.query('select * from fyj where id =' + req.params.id)

  res.render('3_formularioModificar',{dato:modificar});
});


router.post('/modificar/:id', upload.single('imagen'),async function(req, res, next) {

  let modificar;

  if(req.file){

      modificar = `update fyj
        set nombre = '${req.body.nombre}',
        descripcion = '${req.body.descripcion}',
        imagen = '/images/${req.file.originalname}'
        where id = ${req.params.id}
      `

      fs.createReadStream('./uploads/'+req.file.filename).pipe(fs.createWriteStream('./public/images/'+req.file.originalname, function(error){}));
    //borramos el archivo temporal creado
    fs.unlink('./uploads/'+req.file.filename, function(error){});

  }else{

    modificar = `update fyj
    set nombre = '${req.body.nombre}',
    descripcion = '${req.body.descripcion}',
    where id = ${req.params.id}
    `
  }
  

  let resultado = await pool.query(modificar);

  res.render('finalizado',{mensaje: "La modificacion fue exitosa!!"});
});


router.get('/eliminar/:id', async function(req, res, next) {

  let modificar = await pool.query('select * from fyj where id =' + req.params.id)

  res.render('4_formularioEliminar',{dato:modificar});
});

router.post('/eliminar/:id', async function(req, res, next) {

  let modificar = await pool.query('delete from fyj where id =' + req.params.id)

  res.render('finalizado',{mensaje : "se elimino exitosamente!!"});
});


module.exports = router;
  