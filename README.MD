## TrainKoi Api 


# Authentication API :

- SignUp Request (User data store request) : 
  authenticationApi/users  POST  newUser
  [Request body=newUser]

- EditUserData request:
  authenticationApi/users/edit  PUT  editedData
	[Request body=editedData]

- Particular User data fetch request:
	authenticationApi/users/read/id  GET
	[Request parameter=id & response body=user details]

     

# Transaction API :

- spendCoin Request:(this is used for spending one coin of a particular user)
	transactionApi/users/spend   PUT  
	[body=uid]

- addMoreCoin Request:(this is used for adding a requested amount of coin of a particular user)
	transactionApi/users/add   PUT  
	[body=uid,requestedCoin]

# RailwayRouteMaker API :
- DrawRailwayTracks Request:(this request is made for drawing black lines on the google map) (invalid for now) 
	routeBuilderApi/  GET

- DrawRoute Request:(this request is for generating path on google map)
	routeBuilderApi/:trainName/:startingStation/:endingStation/:serviceNo GET	
	(parameter=  train name,destination/starting stationName )

# Location Tracking API :
- storeNewLocation Request:(this request will be made from tracking device to store location of the train):
	locationTrackingApi/newLocationData  POST  
	(body=lat,lon,velocity,time,trainName)


# Database Builder API :
- Database builder request: (this request will be for building the database using the data of text files):

databaseBuilderApi/buildDatabase   POST
