import {ApolloServer} from "apollo-server";
import {PrismaClient} from '@prisma/client';

const fs = require('fs');
const path = require('path');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Task = require('./resolvers/Task');
const User = require('./resolvers/User');
const {getUserId} = require('./utils');

const prisma = new PrismaClient({
    errorFormat: 'minimal'
});


const resolvers = {
    Query,
    Mutation,
    Task,
    User
};

const server = new ApolloServer({
    // typeDefs are read from the schema rather than defining them as a content in this class.
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),

    // Resolvers are broken into their own
    resolvers,

    context: ({req}) => {
        return {
            ...req,
            prisma,
            userId:
                req && req.headers.authorization
                    ? getUserId(req)
                    : null
        };
    },
});

server
    .listen()
    .then(({url}) =>
        console.log(`Server is running on ${url}`)
    );