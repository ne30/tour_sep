import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Home from './home';
import Tour from './tour';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <Switch>
            <Route exact path={"/"} component={Home} />
            <Route exact path={"/tour"} component={Tour} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
