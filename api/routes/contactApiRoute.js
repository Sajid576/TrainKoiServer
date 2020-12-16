const express = require('express');
const router  = express.Router();

const contactController=require('../controller/contactController');



router.post('/storeUserContactData',contactController.storeContactData);

router.get('/getAllUserContactData',contactController.getAllContactData);


router.get('/getRecentContactData/:time',contactController.getRecentContactData);


module.exports=router;