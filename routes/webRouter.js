const express= require('express');
const webController= require('../app/controllers/leapaiController');
const router= express.Router();

router.route('/generate-image')
    .post(webController.generateImage);

module.exports= router;