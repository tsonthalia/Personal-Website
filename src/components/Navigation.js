import React, { Component } from "react";
import {HashRouter, Route} from "react-router-dom";
import {Navbar, Nav} from "react-bootstrap";

import Home from "./Home";
import Programming from "./Programming";
import Engineering from "./Engineering";
import Tutorials from "./Tutorials";

class Navigation extends Component {
  render() {
    return (
      <HashRouter>
        <Navbar bg="light" expand="lg" fixed="top" style={{height: window.innerHeight*.08}}>
          <Navbar.Brand href="#/">Tanay Sonthalia</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav navbar-fixed">
            <Nav className="ml-auto">
              <Nav.Link href="#/">Home</Nav.Link>
              <Nav.Link href="#programming">Programming</Nav.Link>
              <Nav.Link href="#engineering">Engineering</Nav.Link>
              <Nav.Link href="#tutorials">Tutorials</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Route exact path="/" component={Home}/>
        <Route path="/programming" component={Programming}/>
        <Route path="/engineering" component={Engineering}/>
        <Route path="/tutorials" component={Tutorials}/>
      </HashRouter>
    );
  }
}

export default Navigation;
