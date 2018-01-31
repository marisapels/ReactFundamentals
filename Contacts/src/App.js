import React, { Component } from 'react';
import logo from './apelsLab.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to My Laboratory</h1>
        </header>
        <p className="App-intro">
            .NET Development & Operations
        </p>
      </div>
    );
  }
}

export default App;
