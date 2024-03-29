import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import LoaderButton from '../components/LoaderButton';
import './Login.css';
import { Auth } from 'aws-amplify';
import { useAppContext } from '../libs/contextLib';
import { useHistory } from 'react-router-dom';
import { onError } from '../libs/errorLib';
import { useFormFields } from '../libs/hooksLib';


export default function Login() {
    const { userHasAuthenticated } = useAppContext();
    const history = useHistory();
    console.log(history);
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: ""
    });

    async function validationForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(event);
        setIsLoading(true);

        try {
            await Auth.signIn(fields.email, fields.password);
            userHasAuthenticated(true);
            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit} >
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control autoFocus type="email" value={fields.email} onChange={handleFieldChange} />
                </Form.Group>
                <Form.Group size="lg" controlId="password"> 
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={fields.password} onChange={handleFieldChange} />
                </Form.Group>
                <LoaderButton block size="lg" type="submit" isLoading={isLoading} disabled={!validationForm()}>Login</LoaderButton>
            </Form>
        </div>
    );
}