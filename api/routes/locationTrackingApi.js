const express = require('express');
const router  = express.Router();
const locationTrackingController=require('../controller/locationTrackingController');

router.post('/newLocationData',locationTrackingController.storeNewLocationData)


module.exports=router;