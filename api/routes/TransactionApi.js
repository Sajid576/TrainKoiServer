const express = require('express');
const router  = express.Router();
const transactionController=require('../controller/transactionController');


router.put('/users/:data',transactionController.updateCoinDataController)


module.exports=router;










