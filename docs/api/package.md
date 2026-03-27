## app/api/package.json Documentation

This file is a package file for backend API package for SPA project.
Defines workspace package for @app/api [configuration + dependency for backend service].

```"name": "@app/api",``` 
- Package name; @app is workplace scope

```"private": true,``` 
- Prevents this package from being accidentally published to npm

`"type": "module",` 
- Enables ES module syntax (import/export) in this package

`"scripts": {` 
- Custom terminal commands for development, build, and testing

`"dev": "tsx watch src/server.ts",` 
- Runs the server in development mode with automatic restarts on file changes

`"build": "tsc -p tsconfig.json",`
- Compiles TypeScript code to JavaScript using the specified tsconfig.json

`"start": "node dist/server.js", `
- Starts the compiled server from the dist directory

`"test": "jest",` 
- Runs tests using Jest testing framework

`"db:migrate": "prisma migrate dev",` 
- Runs database migrations in development mode using Prisma

`"db:generate": "prisma generate",`
- Generates Prisma client code based on the schema

`"db:reset": "prisma migrate reset --force"` 
- Resets the database by rolling back all migrations and reapplying them (use with caution)

`"dependencies": { `
- Runtime dependencies required for the backend API to function

`"bcrypt": "^5.1.1",`
- Library for hashing passwords securely using the bcrypt algorithm

`"cors": "^2.8.5",`
- Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express apps

`"dotenv": "^16.4.5",` 
- Loads environment variables from a .env file into process.env

`"express": "^4.19.2",`
- Web framework for building the backend API

`"helmet": "^7.1.0",`
- Middleware for securing Express apps by setting various HTTP headers

`"jsonwebtoken": "^9.0.2",`
- Library for creating and verifying JSON Web Tokens (JWT) for authentication

`"zod":"^3.23.8"`
- TypeScript-first schema validation library for validating and parsing data

`"devDependencies": {`
- Development dependencies required for building, testing, and maintaining the backend API

`"@types/bcrypt": "^5.0.2",`
- Type definitions for bcrypt library to enable type checking in TypeScript

`"@types/cors": "^2.8.12",`
- Type definitions for cors library to enable type checking in TypeScript

`"@types/helmet": "^4.0.0",`
- Type definitions for helmet library to enable type checking in TypeScript

`"@types/express": "^4.17.21",`
- Type definitions for express library to enable type checking in TypeScript

`"@types/jsonwebtoken": "^9.0.6",`
- Type definitions for jsonwebtoken library to enable type checking in TypeScript

`"@types/jest": "^29.5.12",`
- Type definitions for Jest testing framework to enable type checking in TypeScript

`"@types/supertest": "^2.0.16",`
- Type definitions for supertest library to enable type checking in TypeScript

`"jest": "^29.7.0",`
- JavaScript testing framework for writing and running tests

`"prisma": "^5.20.0",`
- Database toolkit for modeling, querying, and migrating databases

`"supertest": "^6.3.4",`
- Library for testing HTTP servers by making requests and asserting responses

`"ts-jest": "^29.2.5",`
- Jest transformer for running TypeScript tests with Jest

`"ts-node": "^10.9.2",`
- TypeScript execution environment for running TypeScript code directly without pre-compilation

`"tsx": "^4.17.0",`
- TypeScript execution environment with support for ES modules and watch mode

`"typescript": "^5.5.4"`
- TypeScript language and compiler for adding static types to JavaScript

