require('rc-slider/assets/index.css');
import React, { Component } from 'react';
import Slider from 'rc-slider';
import NumberFormat from 'react-number-format';

const handleStyle = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  cursor: 'pointer',
  padding: '13px',
  border: '2px solid grey',
  borderRadius: '10px',
  background: '#fff',
  fontSize: '20px',
  textAlign: 'center',
};

class CustomHandle extends Component {
  // mixins: [IntlMixin],
  render() {
    const props = this.props;
    const style = Object.assign({ left: `${props.offset}%` }, handleStyle);
    return (
      <NumberFormat style={style} value={props.value} displayType={'text'}
        thousandSeparator={true} prefix={'$'} />
    );
  }
}
CustomHandle.propTypes = {
  value: React.PropTypes.any,
  offset: React.PropTypes.number
};

export default CustomHandle
