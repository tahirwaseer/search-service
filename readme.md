# Search service

## Description
The goal of this service is to behave like a search engine for services. <br>
It should accept user inputs and return results that matched the provided service name. Services data is available in a json file.<br>

The service communicates over http requests.

## Getting started
- Clone the repository
```
git clone --depth=1 https://github.com/Microsoft/TypeScript-Node-Starter.git <project_name>
```

There are two ways to start this application;
### 1. Using docker-compose
I've build a docker image for this service and configured docker-compose to run the application.
It is also easier way to start and test the service. Simply run `docker-compose up` and it should install all the required dependencies and start the application on port 3000. App should be listning on `http://localhost:3000`.

### 2. Using basic npm commands
Application can be run using traditional nodejs apps workflow using npm commands;

Provided that you have already installed `nodejs` and `npm`.
- Install dependencies
```
cd <project_name>
npm install
```
- build typescript files
```
npm run build
```
- start nodejs server
```
npm start

or 

node dist/src/server.js
```

It should start the app on `http://localhost:3000`


*Note* Server only responds to `http://localhost:3000/search` url, no other routes are active.


## Testing the service
Once the server setup is complete and running, you can start testing the service.<br>
Service responds to both `GET` and `POST` requests on `http://localhost:3000/search`.

### GET request
In order to send a get request to service, ´service_name´ and ´geo_location´ are required as query parameters.
For example;
````
GET http://localhost:3000/search?service_name=Svenk&geo_location=59.40411099999999,18.109118499999962
````
The service would respond with relative results ;

````
{
  totalHits: 1,
  totalDocuments: 10,
  results: [
    {
      id: 4,
      name: "Svensk massage",
      position: {
        lat: 59.3433317,
        lng: 18.090476800000033
      },
      distance: "6.84km",
      score: 5.3
    }
  ]
}
````
### POST request
In order to send a get request to service, ´service_name´ and ´geo_location´ are required in request body.
For example;
````
POST http://localhost:3000/search?service_name=Svensk&geo_location=59.40411099999999,18.109118499999962

Request Body => { service_name: "Svensk", geo_location: "59.40411099999999,18.109118499999962"}
````
Similar response is returned in this case as well.

## Matching and score algorithm
For matching the service name with user input and calculating score I've used an external library [fuzzball.js](https://www.npmjs.com/package/fuzzball) which helps calculate relevancy of matched results using fuzzy string matching.

## Tests
I've writted some basic test cases using [jest](https://jestjs.io/) framework. In order to run tests;
```
cd <project_name>
npm run test
```

