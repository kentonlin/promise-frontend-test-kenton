require('rc-slider/assets/index.css');
import React, { Component } from 'react';
var numeral = require('numeral');
import './CustomHandle.css';
// import NumberFormat from 'react-number-format';

const handleStyle = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  cursor: 'pointer',
  padding: '.7em',
  border: '.2em solid grey',
  borderRadius: '.6em',
  background: '#fff',
  fontSize: '1.4em',
  textAlign: 'center'
};

class CustomHandle extends Component {
  // mixins: [IntlMixin],
  render() {
    const props = this.props;
    const style = Object.assign({ left: `${props.offset}%` }, handleStyle);
    const newNumber = numeral(this.props.value).format('0,0')
    return (
      <div style={style}>
        {/* <span> <i className="fa fa-chevron-left grey left sizing" aria-hidden="true"></i> </span> */}
        <span>
        ${newNumber}
      </span>
        {/* <span> <i className="fa fa-chevron-right grey right sizing" aria-hidden="true"></i> </span> */}
      </div>
    );
  }
}
CustomHandle.propTypes = {
  value: React.PropTypes.any,
  offset: React.PropTypes.number
};

export default CustomHandle
