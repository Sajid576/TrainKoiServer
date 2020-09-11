const express = require('express');
const router  = express.Router();

const databaseBuilderController=require('../controller/databaseBuilderController');


router.post('/buildDatabase',databaseBuilderController.buildDatabase)

router.post('/buildDatabase/trainList',databaseBuilderController.buildTrainDatabase)


module.exports=router;
