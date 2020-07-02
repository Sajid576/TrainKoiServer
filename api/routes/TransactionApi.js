const express = require('express');
const router  = express.Router();
const transactionController=require('../controller/transactionController');


router.put('/users/spend',transactionController.spendCoinDataController)
router.put('/users/add',transactionController.addCoinDataController)


module.exports=router;










