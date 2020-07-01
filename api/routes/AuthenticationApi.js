const express = require('express');
const router  = express.Router();

const userDataController=require('../controller/userDataController');


//store user data
router.post('/users',userDataController.storeUserDataController)

//edit user data
router.put('/users/edit/:data',userDataController.editUserDataController)

//read user data
router.get('/users/read/:data',userDataController.readUserDataController)

module.exports=router;
