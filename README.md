# Project 4 - React Native

This repository is our Pokedex React web app from [project3](https://gitlab.stud.idi.ntnu.no/it2810-h21/team-15/project3), developed as a React Native app. React Native allows us to use React to create native iOS & Android applications, using a single codebase that can build to both platforms. As React Native app and a React web app are similar, this documentation includes a lot of repetition from the last project, but we will highlight the differences. We found this suitable, as the documentation will be more readily available for people new to the project. For original documentation, see [project3](https://gitlab.stud.idi.ntnu.no/it2810-h21/team-15/project3).

## Running the application

### 📱 Run the application on a mobile device

1. Download AnyConnect on your mobile device and connect to NTNU VPN:
    - [iPhone and iPad](https://innsida.ntnu.no/wiki/-/wiki/Norsk/VPN+p%C3%A5+Iphone+og+Ipad)
    - [Android](https://innsida.ntnu.no/wiki/-/wiki/Norsk/VPN+p%C3%A5+Android)
2. Download Expo Go for your device:
    - [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US)
    - [App Store](https://apps.apple.com/us/app/expo-go/id982107779)
3. Connect to Expo:
    - One alternative is to connect to our hosted Expo dev-server following [this link](https://expo.dev/@xtrah/it2810-h21-team-15-project4)
    - Another alternative is to run the Expo CLI as explained in the next section about hosting the frontend. **NB!**: Remember to have your computer connected to VPN
        - Turn on "Production Mode"
        - Choose a connection-mode (Tunnel, LAN or Local)
4. Scan the QR-code with your mobile device
5. Use the app!

### 🏙 Hosting the frontend

<!-- https://docs.expo.dev/workflow/expo-cli/ -->

- `npm install -g expo-cli && npm install` to install Expo CLI and required dependencies
- `npm start` to run app using Expo CLI in web browser
- Navigate to `http://localhost:19002/`
- Connect to [NTNU VPN](https://innsida.ntnu.no/wiki/-/wiki/English/Install+vpn) on your computer to use the server we are hosting.

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

- `assets` contains images used in the application
- `components` contains components which have been extracted for easier read or are reused.
- `navigations` contains the logic for navigation.
- `screens` contains components which are parents for a route.
- `types` contains the typescript typings.
- `utils` contains functions which are extracted for easier read or helper functions which are used multiple places.
- `utils/queries.ts` contains functions for the graphql- queries and -mutations.
- `App.tsx` is the root component.

### 🌆 Backend

The backend is the same as [project3](https://gitlab.stud.idi.ntnu.no/it2810-h21/team-15/project3). It is currently running on a server and connected to the current frontend. If you wish to run it locally it's also added to this repository. Notice that you have to change the uri in `App.tsx` to reference to your localhost.

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

### 💾 Database

The database is shared with project3 - [MongoDB](https://www.mongodb.com/why-use-mongodb), [GraphQL](https://graphql.org/), [Express](https://expressjs.com/) and [Apollo client](https://www.apollographql.com/docs/react/why-apollo/).

Read more at [project3](https://gitlab.stud.idi.ntnu.no/it2810-h21/team-15/project3#-database).

## Feature requirements

### 🔎 Search

Most of the functionality from project3 is the same. A user can search for pokemon on SearchScreen. On the client, `useLazyQuery` is used to wait with query until an action. The query is also used on mount, to initialize the application with data before searching on a pokemon name.

In project4 the query is activated on click on search instead of on text input. In project3 the query seemed to rely on cache after the initial query, so there was not needed to use a lazy query. In project4, however, the queries seemed to be slower, making a flash on each input. That indicated there was done a new query on every text input. There was attempted using other events on input and changing [fetching policies](https://www.apollographql.com/docs/react/data/queries/#setting-a-fetch-policy), but this didn't work as expected. Therefore, useQuery was replaced with [useLazyQuery](https://www.apollographql.com/docs/react/api/react/hooks/), adding more control. A search button was added, to limit queries on submit instead of on input changes.

### 📜 Search result pagination

For pagination we [configured the cache](https://www.apollographql.com/docs/react/pagination/offset-based/#setting-keyargs-with-offsetlimitpagination), merging incoming data according to our key arguments. We also used the `fetchMore`-function from `useLazyQuery` to call more items.

### 📑 Detail view of objects

From search results, one can click into details of a pokemon, accessing PokemonCardScreen. This does a new query encompassing more fields of the object. Detail view can be done in a multiple ways. We chose to do a new query in detail page instead of filtering on the client. This entailed making another endpoint for fetching a single pokemon by id. We found this suitable, as it allows a user to access a detail page without having first enter the main page.

### 🗃 Sorting and filtering search

A user can sort on name and filter on pokemon types. These are inputs which are toggled using the cog-icon. Sort and filter are variables the result query is dependent on. The GraphQL query supports these variables. If a user does not set the variables, there will be no filtering on type and sort on name is ascending.

### ⌨ User generated data

A user can add a pokemon on CreatePokemonScreen. This uses `useMutation`, adding an item to the database.

## Tech requirements

This project was initialized using [Expo with React Native and TypeScript](https://reactnative.dev/docs/typescript), as the requirement from the task description stated.

_Expo is a framework and a platform for universal React applications. It is a set of tools and services built around React Native and native platforms that help you develop, build, deploy, and quickly iterate on iOS, Android, and web apps from the same JavaScript/TypeScript codebase._ -[expo.dev](https://docs.expo.dev/)

### ⚖ Global state management

In applications where multiple components need the same state, global state can be a solution to share the state in a good way. Specifically, instead of prop drilling to access the relevant states, global state may be accessed with a simple function, potentially making the code more readable. In this application we found it most appropriate to demonstrate global state management on the search filter. In our use, a user can filter a pokemon, click into detail view of a pokemon, then go back to the search results, and the filter is persisted.

Global state can be implemented in a [number of ways](https://medium.com/extra-credit-by-guild/using-apollos-local-cache-for-global-state-management-with-react-typescript-codegen-and-remote-edb3c8cfbd90). Two popular choices may be redux and mobX. We decided to not choose any of those, but instead go with apollo client. Having the filter values in global state, the queries dependent on those values will automatically update. We also avoid adding another library with its boilerplate code, making our solution arguably less complex and more readable.

Using apollo client, global state can be done by defining a variable on the [cache configuration](https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/). These variables are client-only. In the cache, a so called `reactive variable` is defined, defining initial values and returning a function. The function is used for getting the variables, our global state, and also updating it. If a query depends on a reactive variable, the field automatically refreshes. This made sticking to apollo client a good choice for us.

### 💁‍♀️ Accessibility

In accessibility there are 4 principles for webcontent. It should be operable, perceivable, understandable and robust. These princibles affected our choice of library for designing the application. We wanted a component library as it speeds up development giving good looking design fast. We chose [NativeBase](https://nativebase.io/), as it's was very similar to Chakra UI which we used in the last project, making it easier to transition to React Native. They both support accessibility, they're easy to set up and they're customizeable.

NativeBase offers **operability** out of the box. All our functionality is available using the keyboard. This is tested using 'tab'-key and 'enter' to navigate through functionality. The screen is also navigable. On each screen, we have a navbar allowing a user to navigate back to the home screen.

We have made the screen **perceivable** by designing a layout which has contrast and spacing making the text and elements readable. A specific example is on detail screen, adding a white layer on height-view, so the black text is more readable, in case of dark gradients. For images we have text alternatives, using the alt-attribute.

We have made the screen **understandable** by giving feedback on actions. Hovering a pokemoncard changes the opacity, giving the user a hint of interaction. On data fetching, we have a loading icon and on error we give an error message.

We have made the screen **robust** by testing the screen on different web browsers. We tested the chromium based browsers Google chrome and Microsoft edge, and the non-chromium based browser Firefox. As these did not show any deficits, it's a sign our choice of technology supports different user agents, being robust.

### Misc

We found that React native did not support SVGs and gradients out of the box. For SVGs one solution was to add a library for supporting it. For our use, we found it suitable to change the original SVGs into PNGs. This may have reduced the image quality, but for this project with small icons, we found it suitable. As for gradients, the styling for React Native did not support gradients. Therefore, we added a [library](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) for this.

We changed how to navigate the page in project4. In project3 we used react-router. We thought we could reuse the logic, as there's a native specific package for [react-router](https://v5.reactrouter.com/native/guides/quick-start), but experienced troubles. Instead we used [React navigation](https://reactnavigation.org/). We used stack navigation which seemed like a more native way of adding navigation, as the screens are put on top of eachother, allowing to press back from a screen.

### ⚗️ Code quality and Git

We made use of the formatting tools [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) to ensure a common coding style and good code quality. These were enforced with a pipeline/GitLab CI on pull request and after merge.

We had an early meeting planning each project requirement decomposing them into functional user stories or technical user stories. All user stories were submitted as issues in GitLab, such that commits can be linked.

During development, we strived to follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) for our commit messages.

- [Overview of different commit types](https://github.com/commitizen/conventional-commit-types/blob/v3.0.0/index.json)
- [Rules for commit messages](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
