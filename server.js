const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');

// here go all GraphQL types
const typeDefs = gql`
    type Query{
        sayHi: String!
    }
`

const resolvers = {
    Query: {
        sayHi: () => 'Hello World!'
    }
}

// ApolloServer runs Express behind the scenes
const server = new ApolloServer({
    typeDefs,
    resolvers
})

const PORT = process.env.PORT || 5000;

server.listen({ port: PORT })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    })