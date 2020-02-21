import React, { Component } from "react";
import {HashRouter, Route} from "react-router-dom";
import {Navbar, Nav} from "react-bootstrap";

import Home from "./Home";
import Projects from "./Projects";
// import Programming from "./Programming";
// import Engineering from "./Engineering";
import CommunityService from "./CommunityService";
import Tutorials from "./Tutorials";

import firebase from './firebase.js';

import '../styles/Navigation.css';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resume: '',
    };

    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storage = firebase.storage();

    // Create a storage reference from our storage service
    var storageRef = storage.ref();

    let self = this;

    storageRef.child("Tanay Sonthalia Resume.pdf").getDownloadURL().then(function(url) {
      self.setState({resume: url});
    }).catch(function(error) {
      // eslint-disable-next-line
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          break;

        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;

        case 'storage/canceled':
          // User canceled the upload
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          break;
      }
    });
  }

  logClick() {
    const defaultAnalytics = firebase.analytics();
    defaultAnalytics.logEvent("Open - Resume");
  }

  render() {
    return (
      <HashRouter>
        <Navbar bg="light" expand="lg" fixed="top" style={{height: window.innerHeight*.08}}>
          <Navbar.Brand href="#/">Tanay Sonthalia</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav navbar-fixed">
            <Nav className="ml-auto">
              <Nav.Link href="#/">Home</Nav.Link>
              <Nav.Link href="#projects">Projects</Nav.Link>
              <Nav.Link href="#communityservice">Community Service</Nav.Link>
              <Nav.Link href="#tutorials">Tutorials</Nav.Link>
              <Nav.Link href={this.state.resume} target="_blank" onClick={this.logClick}>Resume</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Route exact path="/" component={Home}/>
        <Route path="/projects" component={Projects}/>
        <Route path="/communityservice" component={CommunityService}/>
        <Route path="/tutorials" component={Tutorials}/>
      </HashRouter>
    );
  }
}

export default Navigation;
