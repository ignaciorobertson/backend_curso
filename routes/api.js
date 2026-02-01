// var express = require('express');
// var router = express.Router();
// var novedadesModel = require('../models/novedadesModel');
// var cloudinary = require('cloudinary').v2;

// router.get('/novedades', async function(req, res, next) {
//     let novedades = await novedadesModel.getNovedades();

//     novedades = novedades.map(novedad => {
//         if (novedad.img_id) {
//             const imagen = cloudinary.url(novedad.img_id, {
//                 width: 960,
//                 height: 200,
//                 crop: 'fill'
//             });
//             return {
//                 ...novedad,
//                 imagen
//             }
//         } else {
//             return {
//                 ...novedad,
//                 imagen: ''
//             }
//         }
//     });

//     res.json(novedades);
// });

// module.exports = router;


var express = require('express');
var router = express.Router();
var novedadesModel = require('../models/novedadesModel');
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');

router.get('/novedades', async function(req, res, next) {
    let novedades = await novedadesModel.getNovedades();

    novedades = novedades.map(novedad => {
        if (novedad.img_id) {
            const imagen = cloudinary.url(novedad.img_id, {
                width: 960,
                height: 200,
                crop: 'fill'
            });
            return {
                ...novedad,
                imagen
            }
        } else {
            return {
                ...novedad,
                imagen: ''
            }
        }
    });

    res.json(novedades);
});

router.post('/reservas', async (req, res) => { // cambie /contacto por /reservas

    const mail = {
        to: 'juanignaciorobertson@gmail.com',
        subject: 'Contacto desde la web',
        html: `${req.body.nombre} se contacto a traves de la web y quiere mas informacion a este correo: ${req.body.email} 
        <br> Ademas, hizo el siguiente comentario: ${req.body.mensaje} <br> Su telefono es: ${req.body.telefono}`
    }

    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    await transport.sendMail(mail);

    res.status(201).json({
        error: false,
        message: 'Mensaje enviado correctamente'
    });
});

module.exports = router;
