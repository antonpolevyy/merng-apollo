const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const { MONGODB } = require('./config.js');

// here go all GraphQL types
const typeDefs = gql`
    type Query{
        sayHi: String!
    }
`;

const resolvers = {
    Query: {
        sayHi: () => 'Hello World!'
    }
};

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