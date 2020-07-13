const express = require('express');
const router  = express.Router();

const databaseBuilderController=require('../controller/databaseBuilderController');


router.post('/buildDatabase',databaseBuilderController.buildDatabase)



module.exports=router;
