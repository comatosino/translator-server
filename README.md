[![MIT](https://img.shields.io/badge/license-MIT-green)](https://opensource.org/licenses/MIT)

# Translator API

## Description

Written in Typescript and powered by Node, Express, and MongoDB

Backend half of the [Translator](#client) web application.

Uses JSON web tokens for authentication and authorization.

Makes requests to Google Translate REST API

## Table of Contents

- [Client](#client)
- [Endpoints](#endpoints)
- [Installation](#installation)
- [Useage](#usage)
- [Contact](#contact)
- [License](#license)

## Client

Deployed site: [Translator web app](https://traductora.herokuapp.com/)

Github repo: [Translator front-end repo](https://github.com/comatosino/translator)

## Endpoints

`POST /auth/register`

- Creates new user and returns JSON web token for authorization.

`POST /auth/login`

- Authenticates an existing user and returns JSON web token for authorization.

`GET /auth/user`

_Requires Bearer token_

- Retrive a user's profile information and history of translations.

`DELETE /auth/logout`

_Requires Bearer token_

- Logout a user.

`POST /api/translate`

_Requires Bearer token_

- Receives translation request from client

- Makes POST request to Google Translate REST API

- Saves successful translation to user's profile in database

- Returns translation as JSON response to client

`DELETE /translations/:id`

_Requires Bearer token_

- Removes a translation from the database

## Installation

`git clone https://github.com/comatosino/translator.git`

`npm install`

Create a .env file in the root directory.

- Define SECRET_KEY for JSON web token encryption

- Define GOOGLE_TRANSLATE_API_KEY to make requests to the Google Translate REST API. This will require an API key throught the Google developer console: https://console.cloud.google.com/

- Define MONGODB_URI to connect to a MongoDB database. If not defined, will seek a local MongoDB connection to translatordb. A local installation of MongoDB is advised in development.

To seed database:

`npm run seed`

To transpile TypeScript to JavaScript:

`tsc`

## Usage

`npm start`

In development, this script will run nodemon and ts-node on `src/index.ts`. 

In production, script will run `node dist/index.js`

## Contact

Questions? Reach out to me at:

GitHub: [comatosino](https://github.com/comatosino)

Email: adamsiii.robert@gmail.com

## License

This project is covered under the [MIT](https://opensource.org/licenses/MIT) license.
