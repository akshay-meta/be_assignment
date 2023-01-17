const express = require('express');
const router = express.Router();

// Module Dependencies
const shortController = require('../app/controllers/short-controller');

/*
 * ROUTER MIDDLEWARE
 */
//All routes will be redirect to HTTPS on production
// var https_port = process.env.HTTPS_PORT || '';
// if (config.express.isOnProduction || https_port) {
//     router.use(function(req, res, next) {
//         var host = req.get('host');
//         //console.log("host = " + host + ", protocol: " + req.protocol);
//         if (req.get('x-forwarded-proto') != "https" && req.protocol != 'https') {
//             // res.set('x-forwarded-proto', 'https');
//             res.redirect('https://' + host +req.url);
//         } else {
//             next();
//         }
//     });
// }

router.get('/', (req, res) => { res.send({ status: 'Server Started Successfully', message: 'Welcome To Shorten Url Service' }) });

// Tiny Url Project Routes
router.post('/short', shortController.saveShortUrI);
router.get('/:shortId', shortController.getUriByShortId);

module.exports = router;