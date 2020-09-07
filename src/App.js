import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Auth, Board } from './pages';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/Auth" component={Auth} />
        <Route path="/Board" component={Board} />
      </div >
    );
  }
}

export default App;
