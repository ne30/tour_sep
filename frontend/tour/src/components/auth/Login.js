import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

export default class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            user_name: "",
            password: "",
            user: {},
            user_loaded: false,
            login_errors: ""
        };
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }   

    handleSuccessfulAuth(data){
        this.setState({
            user: data.user
        });
        this.props.history.push({
            pathname: "/main",
            state: { user_name: this.state.user.user_name }
        });
    }

    handleSubmit(event){
        axios.post("http://127.0.0.1:3001/login", {
            user_name: this.state.user_name,
            password: this.state.password
        },
        { withCredentials: true}
        ).then(
            response => {
                if (response.data.logged_in){
                    this.setState({
                        user: response.data.user,
                        user_loaded: true
                    });
                    // console.log(this.state.user);
                    this.handleSuccessfulAuth(response.data);
                }
            }
        )

        console.log("Form is submitted");
        event.preventDefault();
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log("Change event");
    }

    render() {
        return (
            <div>
                {/* <form onSubmit={this.handleSubmit}>
                    <input type="text" name="user_name" placeholder="User Name" value={this.state.user_name} onChange={this.handleChange} required />

                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />

                    <button type='submit'>Log In</button>
                </form> */}
                <div class="login-form">  
                    <h1>Sign In</h1>
                    <br/>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text"name="user_name" placeholder="User Name" value={this.state.user_name} onChange={this.handleChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                        </Form.Group> 
                        <div class="buttons">
                            <Button variant="primary" type="submit">
                                Log In
                            </Button>
                            {' '}
                            <Form.Text className="text-muted">
                                    Don't have an account?
                            </Form.Text>
                            {' '}
                            <Button href="/" variant="dark">
                                Sign Up
                            </Button>
                        </div>
                    </Form>
                </div>
                <style>
                    {"\
                    .login-form{\
                    margin:28px;\
                    }\
                    "}
                    {"\
                    .buttons{\
                    margin:18px;\
                    }\
                    "}
                </style>
            </div>
        );
    }

}