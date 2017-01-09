require('rc-slider/assets/index.css');
import React, { Component } from 'react';
import Slider from 'rc-slider';
import CustomHandle from './CustomHandle';
import NumberFormat from 'react-number-format';
import './Slider.css';
import { ButtonToolbar, Button } from 'react-bootstrap';

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
      feeAtOriginLow: 150,
      feeAtOriginHigh: 750,
      monthlyPaymentLow: 458,
      monthlyPaymentHigh: 610,
      rateRanges: {
        interestRateLow: 0.0632,
        interestRateHigh: 0.2666,
        originationFeeLow: 0.01,
        originationFeeHigh: 0.05
      }
    };
    this.slide = this.slide.bind(this);
    this.renderSlide = this.renderSlide.bind(this);
    this.rateCalculationNominator = this.rateCalculationNominator.bind(this);
    this.rateCalculationDenominator = this.rateCalculationDenominator.bind(this);
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

  rateCalculationNominator(interestRate, loanAmount) {
    return ((interestRate / 12) * loanAmount);
  }

  rateCalculationDenominator(interestRate) {
    let exp = Math.pow((1 + (interestRate / 12)), -36);
    return (1 - exp);
  }

  // create slide function to handle movement of slider
  slide(value) {
    this.setState({"currentLoan": value,
      feeAtOriginHigh: value * this.state.rateRanges.originationFeeHigh,
      feeAtOriginLow: value * this.state.rateRanges.originationFeeLow,
      monthlyPaymentLow: Math.ceil(this.rateCalculationNominator(this.state.rateRanges.interestRateLow, value) /
        this.rateCalculationDenominator(this.state.rateRanges.interestRateLow)),
      monthlyPaymentHigh: Math.ceil(this.rateCalculationNominator(this.state.rateRanges.interestRateHigh, value) /
        this.rateCalculationDenominator(this.state.rateRanges.interestRateHigh))
      });
  }

  // origination fee high is calculated differently if under

  render() {
    return (
      <div className="SliderContainer">

        <div className="marginTop center">
          <div className="widthSeventy">
            <Slider step={this.state.step} value={this.state.currentLoan}
              onChange={this.slide} min={this.state.minLoan} max={this.state.maxLoan}
              handle={<CustomHandle />}
            />
            <div className="minMax spaceBetween">
              <div> $3,000 </div>
              <div> $35,000 </div>
            </div>
          </div>
        </div>

        <div className="statesContainer center">
          <div className="widthSeventy">
            <div className="statesText">
              The following states have minimum loan amounts above $3,000: GA ($4,000), OH ($6,000), and MA ($7,000).
            </div>
          </div>
        </div>

        <div className="rates center mobile-hide">
          <div className="spaceBetween widthSeventy">
            <div className="ratesBox">
              Monthly Payment:
              <br/>
              ${this.state.monthlyPaymentLow} - ${this.state.monthlyPaymentHigh}†
            </div>
            <div className="ratesBox">
              Fee at Origination:
              <br/>
              ${this.state.feeAtOriginLow} - ${this.state.feeAtOriginHigh}†
            </div>
            <div className="ratesBox">
              Fixed APR:
              <br/>
              ${this.state.fixedAPRdefaultLow} - ${this.state.fixedAPRdefaultHigh}%*
            </div>
          </div>
        </div>

        <div className="marginButton center">
          <div className="widthSeventy center">
            <ButtonToolbar>
              <Button className="center" bsSize="large" bsStyle="info" active>Continue</Button>
            </ButtonToolbar>
          </div>
        </div>

        <div className="rates italic">
          Checking your rate will <span className="underLine">not</span> impact your credit score. <a className="link" href="default.asp" target="_blank">Learn More</a>
        </div>


      </div>
    );
  }
}

export default SliderComponent;
