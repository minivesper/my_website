import React, { Component } from 'react';
import logo from './me.jpg';
import './App.css';
import GravSim from './GravSim.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            My name is Grant Mitchell.
          </p>
          <GravSim />
        </header>
      </div>
    );
  }
}

export default App;
