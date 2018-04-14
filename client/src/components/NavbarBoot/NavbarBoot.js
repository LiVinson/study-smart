import React from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';

import "./NavbarBoot.css";


const NavbarBoot = props => (<Navbar className="customNav">
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#home">Study SMART</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>

    {props.home ? (null) : (
      <Nav pullRight>
        <NavItem eventKey={1} href="#">
          <Button onClick={props.handleLogout}>Profile</Button>
        </NavItem>
        <NavItem eventKey={2} href="#">
          <Button onClick={props.handleLogout}>Log Out</Button>
        </NavItem>
      </Nav>
    )
    }


  </Navbar.Collapse>
</Navbar>);

export default NavbarBoot;