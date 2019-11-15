import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const onChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value});
    }

    const onSubmit = event => {
        event.preventDefault();
        // field validation would go in here, 
        // but we are validating user input on server side anyway
        callback();
    }

    return {
        onChange,
        onSubmit,
        values
    };
}
