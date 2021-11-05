# Project 4

## Development

<!-- TODO: Add commands -->

https://docs.expo.dev/workflow/expo-cli/

### 🌆 Backend

- `npm install` to install dependencies
- `npm run dev` to run server using nodemon, automatically restarting server on file changes
- `npm run lint` to run prettier and eslint checks

#### Backend file structure

```
backend
├───models
├───resolvers
├───schema
├───app.ts
└───index.ts
```

- `models` contains database schemas.
- `resolvers` contains functions for the graphql- queries and -mutations.
- `schema` contains the graphql types for queries, mutations and items.
- `app.ts` exposes the `graphql`-endpoint.
- `index.ts` starts up the application, including connecting to the database.

## React Native

Allows us to use React to create native iOS & Android applications. Single codebase - one codebase that can build to both platforms.

## NativeBase

<!-- TODO: Add info about NativeBase library -->