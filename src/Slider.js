require('rc-slider/assets/index.css');
import React, { Component } from 'react';
import Slider from 'rc-slider';
import CustomHandle from './CustomHandle';
import NumberFormat from 'react-number-format';
import './Slider.css';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { Modal, Content } from 're-bulma';

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
      <div className="center container">

        <div className="SliderContainer">
          <h1>
            Select Loan Amount
          </h1>
          <hr className="dotted widthSeventy"/>

          <div className="marginTop center">
            <div className="widthSeventy marginTop">
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
            Checking your rate will <span className="underLine">not</span> impact your credit score.
            <a className="link" onClick={() => this.setState({ isOpen: true })}> Learn More</a>
            <Modal
              type="card"
              headerContent="Promise Financial Modal"
              footerContent={<div style={{ padding: '20px'}} >Footer</div>}
              isActive={this.state.isOpen}
              onCloseRequest={() => this.setState({ isOpen: false })}
            >
              <Content>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
              </Content>
            </Modal>
          </div>
          <hr className="dotted widthSeventy" />
          <div className="alignContainer center">
            <div className="alignLeft widthSeventy">
              Your actual Monthly Payment, Fee at Origination, and Fixed APR will be determined during the application process. This process checks your eligibility for a 3-year unsecured personal loan of the amount selected above, however if this is not available you may receive a counter-offer for a loan with a lower loan amount or for a loan that would require a cosigner.
            </div>
          </div>
          <div className="alignContainer center bottom">
            <div className="alignLeft widthSeventy">
              To help the government fight the funding of terrorism and money laundering activities, Federal law requires all financial institutions to obtain, verify, and record information that identifies each person who opens an account. As a result, under our customer identification program, we must ask for your name, street address, mailing address, date of birth, and other information that will allow us to identify you. We may also ask to see your driver's license or other identifying documents.
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default SliderComponent;
