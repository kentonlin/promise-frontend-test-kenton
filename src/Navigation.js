import React, { Component } from 'react';
import './Navigation.css';
import { Nav, NavGroup, NavItem, NavToggle, Button, Icon, Image } from 're-bulma';

const style = {
  "height": "7em",
  "position": "fixed",
  "width": "100%"
};
const size = {
  "font-size": "1.2em"
};
const logo = {
  "width": "22em",
  "height": "22em",
  "margin-left": "3em",
  "margin-top": "1em"
};
const menu = {
  "margin-top": "1.6em"
};
const right = {
  "margin-right": "2em"
}

class Navigation extends Component {
  render() {
    return (
      <div className="navigation">
        <Nav style={style}>
          <NavGroup align="left">
              <Image style={logo} src="http://www.nytent.com/nytent/wp-content/uploads/2016/07/promise-financial-logo.png"/>
          </NavGroup>
          <NavToggle style={menu} />
          <NavGroup align="right" isMenu style={right}>
            <NavItem style={size}>
              About Us
            </NavItem>
            <NavItem style={size}>
              FAQ
            </NavItem>
            <NavItem style={size}>
              Sign In
            </NavItem>
            <NavItem>
              <Button color="isPrimary" style={size} size="isMedium">Check Your Rate</Button>
            </NavItem>
          </NavGroup>
        </Nav>
      </div>
    );
  }
}

export default Navigation;
