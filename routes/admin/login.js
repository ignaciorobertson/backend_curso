var express = require('express');
var router = express.Router();
var usuarioModel = require('../../models/usuariosModel');

// diseño de formulario de login
router.get('/', function(req, res, next) {
  res.render('admin/login', {  //login.hbs
    layout: 'admin/layout' 
  });
});

// destruir la sesión
router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.render('admin/login', {
    layout: 'admin/layout'
  });
});

// procesar el formulario con post 

router.post('/', async (req, res, next) => {
  try {
    const usuario = req.body.usuario;
    const password = req.body.password;

    var data = await usuarioModel.getUserByUsernameAndPassword(usuario, password);

    if (data != undefined) {
      req.session.id_usuario = data.id; // 1
      req.session.nombre = data.usuario; // flavia
      res.redirect('/admin/novedades');
    } else {
      res.render('admin/login', {
        layout: 'admin/layout',
        error: true
      });
    }
  } catch (error) {
    // console.log(error);
    // console.log("error en el login");
  }
});
module.exports = router;
