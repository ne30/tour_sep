import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

export default class Registration extends Component {

    constructor(props){
        super(props);

        this.state = {
            user_name: "",
            gender: "",
            password: "",
            password_confirmation: "",
            registration_errors: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }   

    handleSubmit(event){
        axios.post("http://127.0.0.1:3001/registrations", {
            user: {
                user_name: this.state.user_name,
                gender: this.state.gender,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation
            }
        },
        { withCredentials: true}
        ).then(
            response => {
                if (response.data.status === 'created'){
                    this.props.handleSuccessfullRegister(response.data);
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
                <div class="login-form">  
                    <h1>Sign Up</h1>
                        <br/>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="text"name="user_name" placeholder="User Name" value={this.state.user_name} onChange={this.handleChange} required />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Gender</Form.Label>
                                <br/>
                                <Form.Check type="radio" name="gender" value="m" checked={this.state.gender==="m"} onChange={this.handleChange} inline label="M" />
                                <Form.Check type="radio" name="gender" value="f" checked={this.state.gender==="f"} onChange={this.handleChange} inline label="F" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                            </Form.Group> 

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" name="password_confirmation" placeholder="Password Confirmation" value={this.state.password_confirmation} onChange={this.handleChange} required />
                            </Form.Group> 

                            <div class="buttons">
                                <Button variant="primary" type="submit">
                                    Sign Up
                                </Button>
                                {' '}
                                <Form.Text className="text-muted">
                                    Already have an account?
                                </Form.Text>
                                {' '}
                                <Button href="login" variant="dark">
                                    Log In
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