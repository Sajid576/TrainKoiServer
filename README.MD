

## Prequisities
- Download & install NodeJS latest version and NPM in your system[From Here](https://nodejs.org/en/download/ )
  
  

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

- SignUp:

> POST  authenticationApi/users  
  
  * Request JSON object: *

    - uid(string): A unique user id.
    - username(string):A name choosen by the user.
    - email(string): User email.
    - phone(string): User mobile number.
  
  *Response JSON object:*

    - message(string): successful

- EditUserData:
> PUT authenticationApi/users/edit   

   *Request JSON object:*

    - uid(string): A unique user id.
    - username(string):A name choosen by the user.
    - phone(string): User mobile number.

   *Response JSON object:*

     - message(string): successful

- User data fetch:

> GET  authenticationApi/users/read/(string:id)

   *Response JSON object:*

      - message(string): successful
      - uid(string): A unique user id.
      - username(string):A name choosen by the user.
      - email(string): User email.
      - phone(string): User mobile number.

	  

## Transaction API :

- Spend Coin :
   
>  PUT transactionApi/users/spend
 
     * Request JSON object:*

             - uid(string): A unique user id.

     *Response JSON object:*

             - message(string): successful
             - coins(string):total amount of coin of a particular user


- Add More Coin:

> PUT transactionApi/users/add
 
     * Request JSON object:*

             - uid(string): A unique user id.
             - requestedCoins(string): The amount coins a particular user want to add.

     *Response JSON object:*

             - message(string): successful
             - coins(string):total amount of coin of a particular user


## RailwayRouteMaker API :

- Draw Route on Google Map:

> GET  routeBuilderApi/(string:trainName|string:startingStation|string:endingStation|string:serviceNo/
     
        *Response JSON object:*

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



## Location Tracking API :

- Send train location from device:

> POST  locationTrackingApi/newLocationData

	*Response JSON object:*

               - trainName(string): Name of the queried train.
               - latitude(string): latitude value of the train.
               - longitude(string): longitude value of the train.
               - velocity(string): velocity of the queried train.
               - time(string): time of the last location update.

	    
## Database Builder API :
- Database builder request: (this request will be for building the database using the data of text files):

> POST databaseBuilderApi/buildDatabase   

- Train Database builder request:(it will build train database with dummy data)

> POST  databaseBuilderApi/buildDatabase/trainList  

