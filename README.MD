# TrainKoi Api 


# Authentication API :

SignUp Request (User data store request) : 
authenticationApi/users  POST  newUser

EditUserData request:
authenticationApi/users/edit/:data  PUT  editedData

Particular User data fetch request:
authenticationApi/users/read/:data  GET
     

# Transaction API :

changeCoinValue Request:(increament/decreament)
transactionApi/users/id  PUT  changeCoinVal


# RailwayRouteMaker API :
DrawRailwayTracks Request:(this request is made for drawing black lines on the google map)
routeBuilderApi/  GET
DrawRoute Request:(this request is for generating path on google map)
routeBuilderApi/:data  GET	
(data=train name,destination/starting station)






