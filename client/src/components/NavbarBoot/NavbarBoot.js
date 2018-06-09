import React from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';

import "./NavbarBoot.css";


const NavbarBoot = props => {

  return (
    props.home ? (//Renders navbar without username and log out if on the homepage
      <Navbar fluid className="homeNav">
      <Navbar.Header>
        <Navbar.Brand className='navHeader'>
          Study SMART
  </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
    </Navbar>
     
    ) : (
      <Navbar fluid className="profileNav">
      <Navbar.Header>
        <Navbar.Brand className='navHeader navHeaderProfile'>
          Study SMART
  </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Text>
          Welcome {props.first_name}!
      </Navbar.Text>
      <Navbar.Collapse>

        <Nav pullRight>

          <NavItem className="navLink" eventKey={1} href="#">
            <Button bsSize="small" className ="navLinkBtn" bsStyle="default" onClick={props.toggleProfileModal}>View Profile</Button>
          </NavItem>
          <NavItem className="navLink" eventKey={2} href="#">
            <Button bsSize="small" className ="navLinkBtn" bsStyle="default" onClick={props.handleLogout}>Log Out</Button>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    )

  );
}

export default NavbarBoot