const express = require('express');
const router  = express.Router();

const userDataController=require('../controller/UserController');

const validateRegister=require('../validator/signupValidator');


//register user data
router.post('/users/register',validateRegister,userDataController.registerUserDataController)

//edit user data
router.put('/users/edit',userDataController.editUserDataController)

//read user data
router.get('/users/read/:id',userDataController.readUserDataController)

module.exports=router;
