import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class RegisterForm extends Form {
    state = { data: { username: '', password: '', name:'' }, errors: {} };


    schema={
        username: Joi.string().email().required().label('Username'),
        password: Joi.string().required().label('Password').min(5),
        name: Joi.string().required().label('Name'),
    };

    doSubmit = () => {
        console.log(`submitted`);
        //make server call
    }

    render() { 
        return (
            <React.Fragment>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', "Username")}
                    {this.renderInput('password', "Password", 'password')}
                    {this.renderInput('name', "Name")}
                    {this.renderButton("Register")}
                </form>
            </React.Fragment>
        );
    }
}
 
export default RegisterForm;