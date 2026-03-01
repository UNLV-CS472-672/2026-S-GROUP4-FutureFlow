## app/web/package.json Documentation

This file is a package file for frontend React + Vite package for SPA project.
Defines workspace package for @app/web [configuration + dependency for frontend service].

```"name": "@app/web",``` 
- Package name; @app is workplace scope

```"private": true,``` 
- Prevents this package from being accidentally published to npm

`"scripts": {` 
- Custom terminal commands for development, build, and testing

`"dev": "vite",`
- Runs the Vite development server

`"build": "tsc -b && vite build",`
- Runs TypeScript compiler in build mode
- Bundles app for production

`"preview": "vite preview",`
- After building, runs a local production preview server

`"test": "jest"`
- Runs frontend tests

`"dependencies": { `
- Runtime dependencies required for the backend API to function

`"react": "^18.3.1",`
- Core React Library

`"react-dom": "^18.3.1",`
- Handles rendering React into the DOM; attaches React to HTML page

`"react-router-dom": "^6.26.2"`
- Client-side routing for SPA

`"devDependencies": {`
- Development dependencies required for building, testing, and maintaining the backend API

`"@types/react": "^18.3.3",`
- TypeScript definitions for React.

`"@types/react-dom": "^18.3.0",`
- Type definitions for react-dom.

`"typescript": "^5.5.4"`
- TypeScript language and compiler for adding static types to JavaScript

`"vite": "^5.4.1"`
- frontend build tool and dev server