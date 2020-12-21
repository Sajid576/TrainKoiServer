
## Project Architecture

TrainKoi is a realtime train location tracking android application of Bangladesh.It is composed of a frontent and backend side.This is the repository of backend side which is made with Javascript language and Express framework in Nodejs runtime.
This server is used for handling(read/write) user inforamtion , tracking realtime location of all the trains, finding the required distance from train to station using
graph algorithm(Dijkstra) , calculating estimated time using mathematics and physics .
This server is also used for building the firebase cloud firestore database where all the static coordinates of railway are safely stored in more sorted and organized way.


## Prequisities
- Download & install NodeJS latest version and NPM in your system [From Here](https://nodejs.org/en/download/ )

  
  

## Project Installation

- To install all necessary packages that are used in this project, run the following command:

```
$ npm install  
```

- To start the local server ,run the following command:

```
$ npm start   
```
Your server should be available at  ```localhost:3000 ``` .... :)

- To test the specific module using  **jest** ,you need to go to ``test.js`` module in tests package and run the following command :
```
$ npm test
```

## References:
- [Mongoose official documentation](https://mongoosejs.com/docs/index.html )


# TrainKoi Api Documentation 


## UserData API :

1) Request for registering user data:
```
POST   userDataApi/users/register  
```
```
Request JSON object: 
    
    - email(string): User email.
    - password(string) : User password.
    - username(string):A name choosen by the user.
    - phone(string): User mobile number.
  
Response JSON object:
    - _id(string): A unique user id.
    - username(string):A name choosen by the user.
    - email(string): User email.
    - phone(string): User mobile number.
    - coins(Number): Total amount of coin of a particular user
```

2) Request for storing user data after edit:
```
 PUT userDataApi/users/edit   
```
```
Request JSON object:
    - _id(string): A unique user id.
    - username(string):A name choosen by the user.
    - phone(string): User mobile number.

Response JSON object:
    - _id(string): A unique user id.
    - username(string):A name choosen by the user.
    - email(string): User email.
    - phone(string): User mobile number.
    - coins(Number): Total amount of coin of a particular user
```

3) User data fetch:
```
GET  userDataApi/users/read/(string:id)
```
```
Response JSON object:
      - message(string): successful
      - uid(string): A unique user id.
      - username(string):A name choosen by the user.
      - email(string): User email.
      - phone(string): User mobile number.
      - coins(Number): Total amount of coin of a particular user
```
	  

## Transaction API :

1) Spend Coin :
```   
PUT transactionApi/users/spend
```
``` 
Request JSON object:
    - _id(string): A unique user id.
      
Response JSON object:
    - _id(string): A unique user id.
    - username(string):A name choosen by the user.
    - email(string): User email.
    - phone(string): User mobile number.
    - coins(Number):total amount of coin of a particular user

```

2) Add More Coin:
```
PUT transactionApi/users/add
``` 
```
Request JSON object:
	- _id(string): A unique user id.
    - requestedCoins(string): The amount coins a particular user want to add.

Response JSON object:
    - _id(string): A unique user id.
    - username(string):A name choosen by the user.
    - email(string): User email.
    - phone(string): User mobile number.
    - coins(Number): Total amount of coin of a particular user

```

## RailwayRouteMaker API :

1) Get required distance ,estimated time and draw route on Google Map:
```
GET  routeBuilderApi/(string:trainName|string:startingStation|string:endingStation|string:serviceNo/
```     
```
Response JSON object:
	     - message(string): Required time information in Bangla string format
             - estimatedTime(number): Estimated time in seconds.
             - requiredDistance(number): Required distance from train to queried station in KM.
             - route(list): All the coordinates(lat,lon) in string format from train to queried station.
             - traindata(object): 
                       - trainName(string): Name of the queried train.
                       - latitude(string): latitude value of the train.
                       - longitude(string): longitude value of the train.
                       - velocity(string): velocity of the queried train.
                       - time(string): time of the last location update.
             - destinationCordinate(string): Coordinate of destination station.
             - direction(string) : information of direction of the queried train between two nearest stations.

```

## Location Tracking API :

1) Send train location from device:
```
POST  locationTrackingApi/newLocationData
```
Request JSON object:
    - trainName(string): Name of the train.
    - latitude(string): latitude value of the train.
    - longitude(string): longitude value of the train.
    - velocity(string): velocity of the queried train.
    

```
Response JSON object:
    - _id(string): A unique train id.
    - trainName(string): Name of the  train.
    - latitude(string): latitude value of the train.
    - longitude(string): longitude value of the train.
    - velocity(string): velocity of the queried train.
    - time(string): time of the last location update.

```
## Contact API:
1) used to send a contact data from client to server

```
POST  contactApi/storeUserContactData
```
```
Request JSON object:
    - uid(string): A unique user id.
    - username(string):A name choosen by the user.
    - email(string): User email.
    - subject(string): A subject of the contact
    - message(string): A message of the contact

Response JSON object:
    - _id(string): A unique id of the contact
    - uid(string): A unique user id.
    - username(string):A name choosen by the user.
    - email(string): User email.
    - subject(string): A subject of the contact
    - message(string): A message of the contact
    - createdAt(string): Date and time of creating contact


## Database Builder API :
1) Database builder request: (this request will be for building the database using the data of text files):
```
 POST databaseBuilderApi/buildDatabase   
```
2) Train Database builder request:(it will build train database with dummy data)
```
 POST  databaseBuilderApi/buildDatabase/trainList  
```


