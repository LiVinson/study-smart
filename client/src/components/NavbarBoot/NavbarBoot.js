import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import "./NavbarBoot.css";


const NavbarBoot = () => (<Navbar className="customNav">
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#home">Study SMART</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
  <Nav pullRight>
    <NavItem eventKey={1} href="#">
      Link
    </NavItem>
    <NavItem eventKey={2} href="#">
      Link
    </NavItem>
  </Nav>
  </Navbar.Collapse>
</Navbar>);

export default NavbarBoot;