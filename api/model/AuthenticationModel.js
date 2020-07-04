var firebase = require('./FirebaseConnection');


//this method used for storing user data while signing up
async function storeUserData(uid,username,email,phone) 
{
    const usersCollection = firebase.firestore().collection('Users');
    usersCollection.doc(uid).set({
       username:username,
       email:email,
       phone:phone
       
   })
   
}
//this method used for storing edited user data after edited by the user
async function editUserData(uid,username,phone)
{
    const usersCollection = firebase.firestore().collection('Users');
    usersCollection.doc(uid).set({
       username:username,
       phone:phone
       
   }, {merge: true})
   
}


//read user data.This method will be called when there will be no data available in browser cache 
async function readUserData(uid)
{
    const query = firebase.firestore().collection('Users').doc(uid.trim());
    User=await query.get()
    if(User.exists)
    {
        return User.data();
    }
    else
    {
        
        return null;
    }
    
    
    
}


module.exports={
    storeUserData,
    editUserData,
    readUserData
}