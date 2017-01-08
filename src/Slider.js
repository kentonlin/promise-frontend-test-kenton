require('rc-slider/assets/index.css');
import React, { Component } from 'react';
import Slider from 'rc-slider';
import CustomHandle from './CustomHandle';
import NumberFormat from 'react-number-format';
import './Slider.css';
import { Col, Row, Grid } from 'react-bootstrap';

class SliderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 100,
      currentLoan: 0,
      minLoan: 3000,
      maxLoan: 35000,
      defaultLoan: 15000,
      fixedAPRdefaultLow: 6.99,
      fixedAPRdefaultHigh:29.99,
      feeAtOriginDefaultLow: 150,
      feeAtOriginDefaultHigh: 750,
      monthlyPaymentDefaultLow: 458,
      monthlyPaymentDefaultHigh: 610
    };
    this.slide = this.slide.bind(this);
    this.renderSlide = this.renderSlide.bind(this);
  }

  // set interval for initial render of slider
  // call on inital renderSlide function
  componentDidMount() {
    let intervalId = setInterval(this.renderSlide, 40);
    this.setState({ intervalId: intervalId });
  }

  //initial slide animation upon component mounting
  renderSlide() {
    let newValue = this.state.currentLoan += this.state.step;
    if(newValue <= this.state.defaultLoan) {
      this.setState({ currentLoan: newValue });
    }else {
      clearInterval(this.state.intervalId);
      // step is reformatted to 1000 after renderSlide hits defaultLoan
      this.setState({ step: 1000 });
    }
  }

  // create slide function to handle movement of slider
  slide(value) {
    this.setState({"currentLoan": value});
  }

  render() {
    return (
      <div className="SliderContainer">
        <div className="slider">
          <div className="sliderCenter">
            <Slider step={this.state.step} value={this.state.currentLoan}
              onChange={this.slide} min={this.state.minLoan} max={this.state.maxLoan}
              handle={<CustomHandle />}
            />
          </div>
          <div className="minMax">
            <div> $3,000 </div>
            <div> $35,000 </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SliderComponent;
