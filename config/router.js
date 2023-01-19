const express = require('express');
const router = express.Router();

// Module Dependencies
const shortController = require('../app/controllers/short-controller');

/*
 * ROUTER MIDDLEWARE
 */

router.get('/', (req, res) => { res.send({ status: 'Server Started Successfully', message: 'Welcome To Shorten Url Service' }) });

// Tiny Url Project Routes
router.post('/short', shortController.saveShortUrI);
router.get('/:shortId', shortController.getUriByShortId);

module.exports = router;