import React, { Component } from 'react';
import './App.css';
import SliderComponent from './Slider.js';
import Navigation from './Navigation.js';
import { Icon } from 're-bulma';

const white = {
  "color":"white"
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="centerSlider">
          <SliderComponent/>
        </div>
        <div className="bottomContainer">
          <div className="bottomApp">
            <div className="bottomNav">
              <a className="white" href="promisefinancial.com">
                About Us
              </a>
              <a className="white" href="promisefinancial.com">
                Contact Us
              </a>
              <a className="white" href="promisefinancial.com">
                Life Events
              </a>
              <a className="white" href="promisefinancial.com">
                Financing Partners
              </a>
              <a className="white" href="promisefinancial.com">
                Life Events
              </a>
            </div>
            <div className="bottomAppTwo">
              <hr className="dotted width"/>
            </div>
            <div className="bottomAppThree">
              <Icon icon ="fa fa-twitter" style={white}/>
              <Icon icon ="fa fa-facebook" style={white}/>
              <Icon icon ="fa fa-pinterest" style={white} />
              <Icon icon ="fa fa-google-plus" style={white}/>
              <div className="marginTopApp small white">
                22 Hudson Place | Hoboken, NJ | 07030
              </div>
              <div className="marginTopApp small white">
                © 2016 Promise Financial, Inc.
              </div>
              <div className="marginTopApp small white">
                All loans on the Promise Financial platform are originated by Cross River Bank, a New Jersey State Chartered Commercial Bank, Member FDIC and Equal Housing Lender.
              </div>
              <div className="marginTopApp small white">
                * The Annual Percentage Rate (“APR”) on loans through the Promise Financial platform ranges from 6.99% to 29.99%. The APR offered to you may be higher than the lowest rate of 6.99% depending on your credit score, loan amount, application details, and credit history. All loans are subject to credit review and approval.
              </div>
              <div className="marginTopApp small white">
                † For example, a 3-year $10,000 loan with a rate of 6.99% APR would have 36 scheduled monthly payments of $306, and a 3-year $10,000 loan with a rate of 29.99% APR would have 36 scheduled monthly payments of $406. All loans have an origination fee which is deducted from loan proceeds. For example, a $10,000 loan with a 5.00% origination fee rate will pay a $500 origination fee and receive $9,500 in loan proceeds. The APR includes both interest charges and the origination fee.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
