const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');

module.exports = {
    // likeCount & commentCount could be updated in mutations instead
    // but here we use mutation to do that (if the term 'mutation' is right)
    Post: {
        // each time any query, mutation or subscription returns typeDef 'Post'
        // next operation will be called:
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation
    },
    Subscription: {
        ...postsResolvers.Subscription
    }
}