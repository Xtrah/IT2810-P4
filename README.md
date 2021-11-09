# Project 4 - React Native

This repository is our Pokedex React web app from [project3](https://gitlab.stud.idi.ntnu.no/it2810-h21/team-15/project3), developed as a React Native app. React Native allows us to use React to create native iOS & Android applications, using a single codebase that can build to both platforms. As React Native app and a React web app are similar, this documentation will include the main differences we did. Handling of similar solutions, such as global state and accessibility, can be read in the original documentation, see [project3](https://gitlab.stud.idi.ntnu.no/it2810-h21/team-15/project3).

## Development

### 🏙 Frontend

<!-- https://docs.expo.dev/workflow/expo-cli/ -->

- `npm install -g expo-cli && npm install` to install Expo CLI and required dependencies
- `npm run web` to run app using Expo CLI in web browser
- `npm run test` to run tests

#### Frontend file structure

```
project4
├───assets
├───components
├───constants
├───navigation
├───screens
├───types
├───utils
│   │   queries.ts
└───App.tsx
```

Our goal was a file structure which supports maintainability and where you can find functionality exactly where you expect to find it.

- `components` contains components which have been extracted for easier read or are reused.
- `navigations` contains the logic for navigation.
- `screens` contains components which are parents for a route.
- `types` contains the typescript typings.
- `utils` contains functions which are extracted for easier read or helper functions which are used multiple places.
- `utils/queries.ts` contains functions for the graphql- queries and -mutations.
- `App.tsx` is the root component. As for tests, cypress tests are in `/cypress` while the other tests are in `src/__tests__`.

### 🌆 Backend

The backend is the same as [project3](https://gitlab.stud.idi.ntnu.no/it2810-h21/team-15/project3). For easier development it's also added to this repository.

- `cd backend`
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

This project was initialized using [Expo with React Native and TypeScript](https://reactnative.dev/docs/typescript), as the requirement from the task description stated.

_Expo is a framework and a platform for universal React applications. It is a set of tools and services built around React Native and native platforms that help you develop, build, deploy, and quickly iterate on iOS, Android, and web apps from the same JavaScript/TypeScript codebase._ -[expo.dev](https://docs.expo.dev/)

### 🎀 NativeBase

NativeBase was chosen for our design component library, as it carries the same properties we wanted from Chakra UI chosen in our last project. _NativeBase is an accessible, utility-first component library that helps you build consistent UI across Android, iOS and Web._ -[nativebase.io](https://nativebase.io/). Another benefit than its properties, is it being similar to Chakra UI, which allowed easier transition to React Native.

### Changes from React web app to React Native app

We found that React native did not support SVGs and gradients out of the box. For SVGs one solution was to add a library for supporting it. For our use, we found it suitable to change the original SVGs into PNGs. This may have reduced the image quality, but for this project with small icons, we found it suitable. As for gradients, the styling for React Native did not support gradients. Therefore, we added a [library](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) for this.

We changed how to navigate the page in project4. In project3 we used react-router. We thought we could reuse the logic, as there's a native specific package for [react-router](https://v5.reactrouter.com/native/guides/quick-start), but experienced troubles. Instead we used [React navigation](https://reactnavigation.org/). We used stack navigation which seemed like a more native way of adding navigation, as the screens are put on top of eachother, allowing to press back from a screen. In our case, as we only have three views (Search and result, Create and Detail), we didn't find it necessary to add a back button. Instead we kept the home button available.

Most of the functionality from project3 is the same. In project4 the query is activated on click on search instead of on text input. In project3 the query seemed to rely on cache after the initial query, so there was not needed to use a lazy query. In project4, however, the queries seemed to be slower, making a flash on each input. That indicated there was done a new query on every text input. There was attempted using other events on input and changing [fetching policies](https://www.apollographql.com/docs/react/data/queries/#setting-a-fetch-policy), but this didn't work as expected. Therefore, useQuery was replaced with [useLazyQuery](https://www.apollographql.com/docs/react/api/react/hooks/), adding more control. A search button was added, to limit queries on submit instead of on input changes.

### ⚖ Global state management

### 💾 Database

The database is shared with project3 - [MongoDB](https://www.mongodb.com/why-use-mongodb), [GraphQL](https://graphql.org/), [Express](https://expressjs.com/) and [Apollo client](https://www.apollographql.com/docs/react/why-apollo/).

Read more at [project3](https://gitlab.stud.idi.ntnu.no/it2810-h21/team-15/project3#-database).

### ⚗️ Code quality and Git

<!-- Prettier/Eslint/formatting? -->
<!-- Below is same as project3 -->

We had an early meeting planning each project requirement decomposing them into functional user stories or technical user stories. All user stories were submitted as issues in GitLab, such that commits can be linked.

During development, we strived to follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) for our commit messages.

- [Overview of different commit types](https://github.com/commitizen/conventional-commit-types/blob/v3.0.0/index.json)
- [Rules for commit messages](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
