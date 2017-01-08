require('rc-slider/assets/index.css');
import React, { Component } from 'react';
import Slider from 'rc-slider';

class SliderComponent extends Component {
  render() {
    return (
      <div className="Slider">
        <Slider />
      </div>
    );
  }
}

export default SliderComponent;
