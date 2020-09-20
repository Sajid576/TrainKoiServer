var firebase = require('./FirebaseConnection');

class AuthenticaltionModel
{

//this variable used to hold the information of all the users including coin
static AllUsersData={};

constructor()
{

}
logger()
{
    console.log("After modifying state of AllUsersData:  ");
    console.log(JSON.stringify(AuthenticaltionModel.AllUsersData,null,4));
}

//this method used for storing user data while signing up
async storeUserData(uid,username,email,phone) 
{

    var initialCoinAmount=20;
    //this code used for storing the user data into the server variables
    AuthenticaltionModel.AllUsersData[uid]={
        'uid':uid,
        'username':username,
        'email':email,
        'phone':phone,
        'coins':initialCoinAmount
    } ;

    this.logger();
    //this code used for storing user data into the firebase firestore database
    const usersCollection = firebase.firestore().collection('Users');
    usersCollection.doc(uid).set({
       username:username,
       email:email,
       phone:phone,
       coins:initialCoinAmount
       
   })
   
}
//this method used for storing edited user data
async  editUserData(uid,username,phone)
{
    //this code used for storing the user data into the server variables
    AuthenticaltionModel.AllUsersData[uid]['username']=username;
    AuthenticaltionModel.AllUsersData[uid]['phone']=phone;
    
    this.logger();
    
    //this code used for storing user data into the firebase firestore database in merge mode
    const usersCollection = firebase.firestore().collection('Users');
    usersCollection.doc(uid).set({
       username:username,
       phone:phone
       
   }, {merge: true})
   
}


//For loading all users data to server from cloud firestore on start of a server 
readUserDataFromDb()
{
    const query = firebase.firestore().collection('Users').get();

    
    query.then(snapshot => {
     snapshot.forEach(users => 
      {
        
            var uid=users.id;
            var email=users.data()['email'];
            var phone=users.data()['phone'];
            var username=users.data()['username'];
            var coins=users.data()['coins'];
            AuthenticaltionModel.AllUsersData[uid]={
                'uid':uid,
                'username':username,
                'email':email,
                'phone':phone,
                'coins':coins
            } ;
               
        
      });
        this.logger();
         
        
   })
   .catch(error => {
     console.error(error);
   });
    
    
}
//Used to fetch a particular user data from server 
readUserData(uid)
{ 
    var userInfo=AuthenticaltionModel.AllUsersData[uid];
    return userInfo;
}
//used to deduct the coin data of a particular user
spendCoinData(uid)
{
    var userInfo=this.readUserData(uid);
    var coin=Number(userInfo['coins']);
    coin-=1;
    userInfo['coins']=String(coin);
    AuthenticaltionModel.AllUsersData[uid]=userInfo;


    this.logger();

    return coin;


}
//used to  add more coin data of a particular user
addCoinData(uid,requestedCoin)
{
    requestedCoin=Number(requestedCoin);
    var userInfo=this.readUserData(uid);
    var coin=Number(userInfo['coins']);
    console.log(coin+"----"+requestedCoin);
    coin=coin+ requestedCoin;
    userInfo['coins']=coin;
    AuthenticaltionModel.AllUsersData[uid]=userInfo;


    this.logger();
    return coin;

}

}


module.exports={
    AuthenticaltionModel
}