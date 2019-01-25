import React, { Component } from 'react';
import logo from './me.jpg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            My name is Grant Mitchell. I like to get it.
          </p>
        </header>
      </div>
    );
  }
}

export default App;
