import axios from 'axios';
import { Button } from 'bootstrap';
import React, { Component } from 'react';
import Login from './auth/Login';
import Registration from './auth/Registration';

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleSuccessfullRegister = this.handleSuccessfullRegister.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccessfulAuth(data){
    this.props.handleLogin(data);
    this.props.history.push("/tour");
  }

  handleSuccessfullRegister(data){
    // this.props.handleLogin(data);
    this.props.history.push("/login");
  }

  handleLogoutClick(){
    axios.delete("http://127.0.0.1:3001/logout", {withCredentials: true}).then(response => {
      this.props.handleLogout();
    })
    .catch(error => {
      console.log("logout error", error);
    });
  }

  render() {
    return (
      <div>
        <Registration handleSuccessfullRegister={this.handleSuccessfullRegister}/>
      </div>
    );
  }
}

