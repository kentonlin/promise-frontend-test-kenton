import React, { Component } from 'react';
import './App.css';
import SliderComponent from './Slider.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <SliderComponent/>
      </div>
    );
  }
}

export default App;
