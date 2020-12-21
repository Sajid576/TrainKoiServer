const express = require('express');
const router  = express.Router();
const TrainLocationController=require('../controller/TrainLocationController');

router.post('/newLocationData',TrainLocationController.storeNewLocationData)


module.exports=router;