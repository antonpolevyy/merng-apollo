
const { gql } = require('apollo-server');

// here go all GraphQL types
module.exports = gql`
    type Post{
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }
    type Query{
        getPosts: [Post]
    }
`;