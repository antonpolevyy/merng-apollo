const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/Post');
const { MONGODB } = require('./config.js');

// here go all GraphQL types
const typeDefs = gql`
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

const resolvers = {
    Query: {
        async getPosts(){
            try{
                const posts = await Post.find();
                return posts;
            } catch(err){
                throw new ErrorEvent(err);
            }
        }
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