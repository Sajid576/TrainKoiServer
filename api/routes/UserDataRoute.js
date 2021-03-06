const express = require('express');
const router  = express.Router();

const userDataController=require('../controller/UserController');

const validateRegister=require('../validator/signupValidator');
const authenticate=require('../validator/authenticator');

//login user 
router.post('/users/login',userDataController.loginUserController)


//register user data
router.post('/users/register',validateRegister,userDataController.registerUserDataController)

//edit user data
router.put('/users/edit',authenticate,userDataController.editUserDataController)

//read user data
router.get('/users/read/:email',authenticate,userDataController.readUserDataController)

module.exports=router;
