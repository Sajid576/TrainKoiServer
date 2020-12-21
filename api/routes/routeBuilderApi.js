const express = require('express');
const router  = express.Router();


const routeBuilderController=require('../controller/routeBuilderController');

//this GET request is for generating path on google map
router.get('/:trainName/:startingStation/:endingStation/:serviceNo',routeBuilderController.drawRouteController)


module.exports=router;