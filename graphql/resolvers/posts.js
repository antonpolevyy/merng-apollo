const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Query: {
        async getPosts(){
            console.log('getPosts');
            try{
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch(err){
                throw new ErrorEvent(err);
            }
        },
        async getPost(_, { postId }){
            console.log('getPost(id)');
            try{
                const post = await Post.findById(postId);
                if(post){
                    return post;
                } else {
                    throw new Error('Post not found');
                }
            } catch(err) {
                throw new ErrorEvent(err);
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context) {
            console.log('createPost');
            const user = checkAuth(context);

            if(body.trim() === ''){
                throw new Error('Post body must not be empty');
            }
      
            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });
      
            const post = await newPost.save();

            // update Subscription 'NEW_POST'
            context.pubsub.publish('NEW_POST', {
                newPost: post
            })
      
            return post;
        },
        async deletePost(_, { postId }, context) {
            const user = checkAuth(context);
      
            try {
                const post = await Post.findById(postId);
                if (user.username === post.username) {
                    await post.delete();
                    return 'Post deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async likePost(_, { postId }, context){
            const { username } = checkAuth(context);

            const post = await Post.findById(postId);
            if(post){
                // if the user liked this post already then remove the like
                if(post.likes.find(like => like.username === username)){
                    // Post already liked => unlike it
                    post.likes = post.likes.filter(like => like.username !== username);
                } else {
                    // Post not liked => like it
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    });
                }

                await post.save();
                return post;
            } else throw new UserInputError('Post not found');
        }
    },
    Subscription: {
        newPost: {
            // in here {pubsub} means pass the pubsub from context
            // 'NEW_POST' is a trigger name to use when upating subscription
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
        }
    }
}