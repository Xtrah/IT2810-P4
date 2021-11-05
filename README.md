# Project 4 - React Native

This repository is  our Pokedex React web app from [project3](https://gitlab.stud.idi.ntnu.no/it2810-h21/team-15/project3), developed as a React Native app. React Native allows us to use React to create native iOS & Android applications, using a single codebase that can build to both platforms.

## Development

### 🏙 Frontend

<!-- https://docs.expo.dev/workflow/expo-cli/ -->

- `npm install -g expo-cli && npm install` to install Expo CLI and required dependencies
- `npm run web` to run app using Expo CLI in web browser
- `npm run test` to run tests

#### Frontend file structure

<!-- TODO -->

### 🌆 Backend

The backend is the same as [project3](https://gitlab.stud.idi.ntnu.no/it2810-h21/team-15/project3). For easier development it's also added to this repository.

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

## Tech requirements

This project was initialized using [Expo with React Native and TypeScript](https://reactnative.dev/docs/typescript).

_Expo is a framework and a platform for universal React applications. It is a set of tools and services built around React Native and native platforms that help you develop, build, deploy, and quickly iterate on iOS, Android, and web apps from the same JavaScript/TypeScript codebase._ -[expo.dev](https://docs.expo.dev/)

### 📚 NativeBase

_NativeBase is an accessible, utility-first component library that helps you build consistent UI across Android, iOS and Web._ -[nativebase.io](https://nativebase.io/)

We use the following components from NativeBase:

- X
- Y
- Z

### ⚖ Global state management

### 💾 Database

The database is shared with project3 - [MongoDB](https://www.mongodb.com/why-use-mongodb), [GraphQL](https://graphql.org/), [Express](https://expressjs.com/) and [Apollo client](https://www.apollographql.com/docs/react/why-apollo/).

Read more at [project3](https://gitlab.stud.idi.ntnu.no/it2810-h21/team-15/project3#-database).

### 🧪 Tests

### ⚗️ Code quality and Git

<!-- Prettier/Eslint/formatting? -->
<!-- Below is same as project3 -->

We had an early meeting planning each project requirement decomposing them into functional user stories or technical user stories. All user stories were submitted as issues in GitLab, such that commits can be linked.

During development, we strived to follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) for our commit messages.

- [Overview of different commit types](https://github.com/commitizen/conventional-commit-types/blob/v3.0.0/index.json)
- [Rules for commit messages](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)