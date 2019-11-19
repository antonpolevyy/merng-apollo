import React, { useState } from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { FETCH_POSTS_QUERY } from '../util/graphql';

function DeleteButton({ postId, callback }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(proxy){
            setConfirmOpen(false);

            // remove post from cache
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            const new_posts = data.getPosts.filter(post => post.id !== postId)
            proxy.writeQuery({ 
                query: FETCH_POSTS_QUERY, 
                data: { getPosts: [...new_posts] }
            });

            // callback function is called when useMutation is done
            // it used in SinglePost page to redirect to Home page
            if(callback) callback();
        },
        variables: { postId }
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
                onConfirm={deletePost}
            ></Confirm>
        </>
    );
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`;

export default DeleteButton;