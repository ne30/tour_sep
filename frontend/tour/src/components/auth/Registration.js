import React, { Component } from 'react';
import axios from 'axios';

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
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="user_name" placeholder="User Name" value={this.state.user_name} onChange={this.handleChange} required />

                    <strong>Gender</strong>

                    <label>
                        <input type="radio"
                        name="gender"
                        value="m"
                        checked={this.state.gender==="m"}
                        onChange={this.handleChange}
                        /> M
                    </label>

                    <label>
                        <input type="radio"
                        name="gender"
                        value="f"
                        checked={this.state.gender==="f"}
                        onChange={this.handleChange}
                        /> F
                    </label>

                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />

                    <input type="password" name="password_confirmation" placeholder="Password Confirmation" value={this.state.password_confirmation} onChange={this.handleChange} required />

                    <button type='submit'>Register</button>
                </form>
            </div>
        );
    }
}