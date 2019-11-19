import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function PostForm() {
    const { values, onChange, onSubmit } = useForm(createPostCallback, { body: '' });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            const new_post = result.data.createPost;
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: { getPosts: [new_post, ...data.getPosts] }
            });
            values.body = '';
        }
    });

    // workaround the situation where 'createPost' defined after 'values',
    // but it's called to get 'values'
    // trick works because javascript reads all function definitions before the line-by-line execution
    function createPostCallback() {
        createPost();
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <h2>Create a post:</h2>
                <Form.Field>
                    <Form.Input 
                        placeholder="Hi World!"
                        name="body"
                        onChange={onChange}
                        value={values.body}
                        error={error ? true : false}
                    />
                    <Button type="submit" color="teal">
                        Submit
                    </Button>
                </Form.Field>
            </Form>
            {error && (
                <div className="ui error message" style={{ marginBottom: 20 }}>
                    <ui className="list">
                        <li>
                            {error.graphQLErrors[0].message}
                        </li>
                    </ui>
                </div>
            )}
        </>
    );
}

const CREATE_POST_MUTATION = gql`
    mutation createPost(
        $body: String!
    ) {
        createPost( body: $body ){
            id
            body
            username
            createdAt
            likeCount
            likes {
                id username createdAt
            }
            commentCount
            comments {
                id body username createdAt
            }
        }
    }
`;

export default PostForm;