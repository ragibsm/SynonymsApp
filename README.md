# SynonymsApp
Simple app that let's you to create synonyms and search for them. Built by using NodeJS on the backend and React on the frontend side.

## Getting started
- Clone the repository
``
git clone git@github.com:ragibsm/SynonymsApp.git
``

## Running the app

There are two ways the app can be started. Easier one by using Docker and more complicated one by running manually API and UI projects

### Running the app with Docker

- Simply execute
``
docker-compose up
``
from the root of the repository and you will have API running on port 3000 and UI on port 3001

### Running the app manually

- Install [Node.js](https://nodejs.org/en/) version 20

- Install dependencies in API and UI projects
``
npm install
``
- Run API project
``
npm start
``
  and you will have API running on port 3000

- Run UI project
``
npm run dev
``
  you will have UI running on port 5173
  
## Swagger API docs

Swagger API documentation is available at `http://localhost:3000/docs`