const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Mutation: {
        createComment: async (_, { postId, body }, context) => {
            const { username } = checkAuth(context);
            if(body.trim() === ''){
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment body must not be empty'
                    }
                })
            }

            const post = await Post.findById(postId);

            if(post){
                // add to the top of comments array
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                });
                await post.save();
                return post;
            } else throw new UserInputError('Post not found');
        },
        async deleteComment(_, { postId, commentId }, context){
            const { username } = checkAuth(context);

            const post = await Post.findById(postId);

            if(post){
                const commentIndex = post.comments.findIndex(comment => comment.id === commentId)

                // check if current user is the owner of the comment
                if(post.comments[commentIndex].username === username){
                    // delete comment from comments array
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } else {
                throw new UserInputError('Post not found');
            }
        }
    }
}