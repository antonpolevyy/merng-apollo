import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Button, Icon, Label } from 'semantic-ui-react'

function LikeButton( { user, post: { id, likes, likeCount } }) {
    const [liked, setLiked] = useState(false);
    // useEffect(callback) Hook tells React that after every render,
    // the callback function should be called. 
    // React will remember this callback and call it later after performing the DOM updates.
    // dependency array [user, likes] means that callback is called if [user, likes] changes 
    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)) {
            setLiked(true);
        } else setLiked(false);
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id }
    });

    const likeButton = user ? (
        liked ? (
            <Button color="teal">
                <Icon name="heart" />
            </Button>
        ) : (
            <Button color="teal" basic>
                <Icon name="heart" />
            </Button>
        )
    ) : (
        <Button as={Link} to="/login"  color="teal" basic>
            <Icon name="heart" />
        </Button>
    )

    return (
        <Button as="div" labelPosition="right" onClick={likePost}>
          {likeButton}
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
    );
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likeCount
            likes{
                id 
                username
            }
        }
    }
`;

export default LikeButton;