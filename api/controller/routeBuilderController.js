require('../model/readData');


//Get request for drawing black lines on the google map
drawRailwayTracksController =(req,res,next)=>{

    res.status(200).json({
        message:'Getting all the list of coordinates',
        list:[]
    })
}

//this GET request is for generating path on google map
drawRouteController =(req,res,next)=>{

    res.status(201).json({
        message:'Getting a list of coordinates',
        list:[]
    })
}

module.exports.drawRailwayTracksController=drawRailwayTracksController;
module.exports.drawRouteController=drawRouteController;