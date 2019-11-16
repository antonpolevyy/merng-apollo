import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';


function Login(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallbackUser, {
        username: '',
        password: ''
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        // update(proxy, result){
        update(_, { data: { login: userData } }){
            // instead of update(proxy, result){..} 
            // we use update(_, { data: { register: userData } }){..}
            // by doing so, we ignore 'proxy' argument and destructure 'result'
            // { data: { login: userData } means we destructure result.data 
            // to get 'login' variable and rename it into 'userData'
            context.login(userData);
            props.history.push('/');
        },
        onError(err){
            // graphQLErrors can return multiple errors,
            // but our gGraphQL server written in a way that 
            // it gives one error object which holds all the errors
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    // workaround the situation where 'loginUser' defined after 'values',
    // but used in line with 'values' and vise versa
    // current approach works because javascript reads everything with word 'function'
    // before the line by line execution
    function loginUserCallbackUser(){
        loginUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading': ''}>
                <h1>Login</h1>
                <Form.Input 
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />
                <Form.Input 
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Login
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

const LOGIN_USER = gql`
    mutation login( $username: String!, $password: String!) {
        login( username: $username, password: $password ){
            id
            email
            username
            createdAt
            token
        }
    }
`;

export default Login;

