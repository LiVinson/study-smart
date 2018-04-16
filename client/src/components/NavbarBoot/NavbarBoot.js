import React from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';

import "./NavbarBoot.css";


const NavbarBoot = props => (
<Navbar fluid className="customNav">
  <Navbar.Header>
    <Navbar.Brand className='navHeader'>
      Study SMART
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>


  {props.home ?
    (null) : (
      <Navbar.Collapse>
        {/* <Navbar.Text>
          Welcome {props.first_name}!
        </Navbar.Text> */}
        <Nav pullRight>
          <NavItem className="navLink" eventKey={1} href="#">
            <Button bsStyle="link" onClick={props.handleLogout}>Profile</Button>
          </NavItem> 
          <NavItem className="navLink"eventKey={2} href="#">
            <Button  bsStyle="link" onClick={props.handleLogout}>Log Out</Button>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    )
  }
</Navbar>);

export default NavbarBoot;