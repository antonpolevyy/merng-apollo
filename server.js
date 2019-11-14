const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');

// publisher subsribe is used for Subscriptions
const pubsub = new PubSub();

// ApolloServer runs Express behind the scenes
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // get request from express and forward it to the context
    // so we could later access it from the context like context.req.someVariable
    // * The context object is one that gets passed to every single resolver at every level, so we can access it anywhere in our schema code.
    context: ({ req }) => ({ req, pubsub }) // pass pubsub to context as well
});

const PORT = process.env.PORT || 5000;

mongoose
    .connect(MONGODB, { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(() => {
        console.log('MongoDB connected');
        return server.listen({ port: PORT })
    })
    .then(res => {
        console.log(`Server running at ${res.url}`);
    });