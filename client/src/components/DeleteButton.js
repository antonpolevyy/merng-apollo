import React, { useState } from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { FETCH_POSTS_QUERY } from '../util/graphql';

function DeleteButton({ postId, commentId, callback }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePostOrComment] = useMutation(mutation, {
        update(proxy){
            setConfirmOpen(false);

            if(!commentId){
                // remove post from cache
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });
                const new_posts = data.getPosts.filter(post => post.id !== postId)
                proxy.writeQuery({ 
                    query: FETCH_POSTS_QUERY, 
                    data: { getPosts: [...new_posts] }
                });
            }

            // callback function is called when useMutation is done
            // it used in SinglePost page to redirect to Home page
            if(callback) callback();
        },
        variables: { 
            postId, 
            commentId
        }
    })

    return(
        <>
            <Button 
                as="div" 
                color="red" 
                floated="right"
                onClick={() => setConfirmOpen(true)}
            >
                <Icon name="trash" style={{ margin: 0 }} />
            </Button>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePostOrComment}
            ></Confirm>
        </>
    );
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`;

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!){
        deleteComment(postId: $postId, commentId: $commentId){
            id
            commentCount
            comments{
                id 
                username
                createdAt
                body
            }
        }
    }
`;

export default DeleteButton;