# Items CRUD
App to practice making a CRUD with Node.js.

Impplemented a REST API with Express, authentication with Passport.js and JSONWebTokens, logging with Winston and Mongo with Mongoose.

# Installing and running
## 1. Clone the project
```
git clone https://github.com/EdmilDM/ItemsNode.git
```

## 2. Install dependencies (Yarn or NPM)
```
yarn install / npm install
```

## 3. Have a Mongo Server to connect to. 

Either install locally(https://www.mongodb.com/) or connect to a service (like mLab).

## 4. Make .env file in root with configuration variables for database, and port for app.

Example:

PORT=3001,
DB_USER=admin,
DB_PASSWORD=test,
DB_HOST=localhost,
DB_PORT=27017,
DB_NAME=products
