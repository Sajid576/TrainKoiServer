
## Project Architecture

TrainKoi is a realtime train location tracking android application of Bangladesh.It is composed of a frontent and backend side.This is the repository of backend side which is made with Javascript language and Express framework in Nodejs runtime.
This server is used for handling(read/write) user inforamtion , tracking realtime location of all the trains, finding the required distance from train to station using
graph algorithm(Dijkstra) , calculating estimated distance using mathematics,physics and Machine learning.
This server is also used for building the firebase cloud firestore database where all the static coordinates of railway are safely stored in more sorted and organized way.


## Prequisities
- Download & install NodeJS latest version and NPM in your system [From Here](https://nodejs.org/en/download/ )
- Install MongoDB . 
  
  

## Project Installation

- To install all necessary packages that are used in this project, run the following command:

```
$ npm install  
```

- To start the local server ,run the following command:

```
$ npm start   
```
Your server should be available at PORT 3000  .... :)





# TrainKoi Api Documentation 


## Authentication API :

1) Request for storing user data after signUp:
```
POST   authenticationApi/users  
```
```
Request JSON object: 

    - uid(string): A unique user id.
    - username(string):A name choosen by the user.
    - email(string): User email.
    - phone(string): User mobile number.
  
Response JSON object:
    - message(string): successful

```

2) Request for storing user data after edit:
```
 PUT authenticationApi/users/edit   
```
```
Request JSON object:
    - uid(string): A unique user id.
    - username(string):A name choosen by the user.
    - phone(string): User mobile number.

Response JSON object:
     - message(string): successful

```

3) User data fetch:
```
GET  authenticationApi/users/read/(string:id)
```
```
Response JSON object:
      - message(string): successful
      - uid(string): A unique user id.
      - username(string):A name choosen by the user.
      - email(string): User email.
      - phone(string): User mobile number.

```
	  

## Transaction API :

1) Spend Coin :
```   
PUT transactionApi/users/spend
```
``` 
Request JSON object:
      - uid(string): A unique user id.
      
Response JSON object:
      - message(string): successful
      - coins(Number):total amount of coin of a particular user

```

2) Add More Coin:
```
PUT transactionApi/users/add
``` 
```
Request JSON object:
	- uid(string): A unique user id.
        - requestedCoins(string): The amount coins a particular user want to add.

Response JSON object:
             - message(string): successful
             - coins(Number):total amount of coin of a particular user

```

## RailwayRouteMaker API :

1) Draw Route on Google Map:
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
```
Response JSON object:

               - trainName(string): Name of the queried train.
               - latitude(string): latitude value of the train.
               - longitude(string): longitude value of the train.
               - velocity(string): velocity of the queried train.
               - time(string): time of the last location update.

```
	    
## Database Builder API :
1) Database builder request: (this request will be for building the database using the data of text files):
```
 POST databaseBuilderApi/buildDatabase   
```
2) Train Database builder request:(it will build train database with dummy data)
```
 POST  databaseBuilderApi/buildDatabase/trainList  
```


