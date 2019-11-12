const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');



// ApolloServer runs Express behind the scenes
const server = new ApolloServer({
    typeDefs,
    resolvers
});

const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB, { 
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