import axios from 'axios';
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Home from './components/Home';
import Main from './components/Main';
import Ticket from './components/Ticket';
import Tour from './components/Tour';



export default class App extends Component {

  constructor(){
    super();

    this.state = {
      logged_in_status: "NOT_LOGGED_IN",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }

  checkLoginStatus(){
    axios.get("http://127.0.0.1:3001/logged_in", { withCredentials: true}).then(response=>{
      if (
        response.data.logged_in &&
        this.state.logged_in_status === "NOT_LOGGED_IN"
      ) {
        this.setState({
          logged_in_status: "LOGGED_IN",
          user: response.data.user
        });
      } else if (
        !response.data.logged_in &
        (this.state.logged_in_status === "LOGGED_IN")
      ) {
        this.setState({
          logged_in_status: "NOT_LOGGED_IN",
          user: {}
        });
      }
    })
    .catch(error => {
      console.log("check login error", error);
    });
  }

  componentDidMount(){
    this.checkLoginStatus();
  }

  handleLogout(){
    // sessionStorage.removeItem('user_id');
    this.setState({
      logged_in_status: "NOT_LOGGED_IN",
      user: {}
    });
  }

  handleLogin(data){
    this.setState({
      logged_in_status: "LOGGED_IN",
      user: data.user
    });
  }

  render() {
    return (
      <div className='app'>
        {/* <h1>{this.state.user.user_name}</h1> */}
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={(props) => (
            <Home 
            {...props} 
            handleLogin={this.handleLogin} 
            handleLogout={this.handleLogout} 
            logged_in_status={this.state.logged_in_status} 
            /> )
            } />
            <Route exact path="/tour"render={(props)=> 
            (<Tour {...props} user={this.state.user} logged_in_status={this.state.logged_in_status} /> )} />

            <Route exact path="/my_tickets" render={(props) => (
              <Ticket {...props} user={this.state.user} />
            )} />
            <Route exact path="/main" render={(props) => (
              <Main {...props} user={this.state.user} />
            )} />
            <Route exact path="/login" render={(props) => (
              <Login {...props}
                handleLogin={this.handleLogin} 
                handleLogout={this.handleLogout} 
                user={this.state.user} />
            )} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
