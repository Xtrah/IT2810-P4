/* eslint-disable import/prefer-default-export */

import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import schema from './schema';
import rootResolver from './resolvers';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: rootResolver,
    graphiql: true,
  })
);

export { app };
