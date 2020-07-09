const express = require('express');
const router  = express.Router();


const routeBuilderController=require('../controller/routeBuilderController');


//Get request for drawing black lines on the google map
router.get('/',routeBuilderController.drawRailwayTracksController)

//this GET request is for generating path on google map
router.get('/:trainName/:stationName/:serviceNo',routeBuilderController.drawRouteController)


module.exports=router;