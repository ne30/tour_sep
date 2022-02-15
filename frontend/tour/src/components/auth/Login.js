import React, { Component } from 'react';
import axios from 'axios';

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
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="user_name" placeholder="User Name" value={this.state.user_name} onChange={this.handleChange} required />

                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />

                    <button type='submit'>Log In</button>
                </form>
            </div>
        );
    }

}