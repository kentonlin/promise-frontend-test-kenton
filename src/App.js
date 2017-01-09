import React, { Component } from 'react';
import './App.css';
import SliderComponent from './Slider.js';
import Navigation from './Navigation.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <SliderComponent/>
      </div>
    );
  }
}

export default App;
