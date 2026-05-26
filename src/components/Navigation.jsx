import React, { Component } from "react";
import {HashRouter, Route} from "react-router-dom";
import {Navbar, Nav} from "react-bootstrap";

import Home from "./Home";
import Projects from "./Projects";
import Resume from "./Resume";
import WorkExperience from "./WorkExperience";

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
      navExpanded: false,
    };

    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storage = firebase.storage();

    // Create a storage reference from our storage service
    var storageRef = storage.ref();

    let self = this;

    storageRef.child("resume.pdf").getDownloadURL().then(function(url) {
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
    this.setState({ navExpanded: !this.state.navExpanded });
    const defaultAnalytics = firebase.analytics();
    defaultAnalytics.logEvent("Open - Resume");
  }

  setNavExpanded(expanded) {
    this.setState({ navExpanded: !this.state.navExpanded });
  }

  closeNav() {
    this.setState({ navExpanded: false });
  }

  render() {
    const currentYear = new Date().getFullYear();

    return (
      <HashRouter>
        <Navbar bg="light" expand="lg" fixed="top" style={{height: window.innerHeight*.08}} onToggle={() => {this.setNavExpanded()}} expanded={this.state.navExpanded}>
          <Navbar.Brand href="#/">Tanay Sonthalia</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav navbar-fixed">
            <Nav className="ml-auto">
              <Nav.Link href="#/" onClick={() => {this.closeNav()}}>Home</Nav.Link>
              <Nav.Link href="#workexperience" onClick={() => {this.closeNav()}}>Work Experience</Nav.Link>
              <Nav.Link href="#projects" onClick={() => {this.closeNav()}}>Projects</Nav.Link>
              <Nav.Link href="#communityservice" onClick={() => {this.closeNav()}}>Community Service</Nav.Link>
              <Nav.Link href="#tutorials" onClick={() => {this.closeNav()}}>Tutorials</Nav.Link>
              <Nav.Link href="#resume" onClick={() => {this.closeNav()}}>Resume</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Route exact path="/" component={Home}/>
        <Route path="/workexperience" component={WorkExperience}/>
        <Route path="/projects" component={Projects}/>
        <Route path="/communityservice" component={CommunityService}/>
        <Route path="/tutorials" component={Tutorials}/>
        <Route path="/resume" component={Resume}/>

        <div>
          <footer>Copyright &copy; 2020-{currentYear} Tanay Sonthalia</footer>
        </div>
      </HashRouter>
    );
  }
}

export default Navigation;
