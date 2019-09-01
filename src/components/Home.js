import React, { Component } from 'react';
import firebase from './firebase.js';
import { SocialIcon } from 'react-social-icons';

import '../styles/Home.css';

import Particles from 'react-particles-js';
const particlesOptions = {
    "particles": {
      "line_linked": {
          "enable": true,
          "distance": 200,
          "color": "#47AEE3",
          "opacity": 0.2,
          "width": 2
        },

        "number": {
            "value": 200
        },
        "size": {
            "value": 4
        },
        "move": {
          "enable": true,
          "speed": 3,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
    },
};

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personalPicURL: "",
      aboutMeURL: "",
    }

    this.loadData();
  }

  loadData() {
    let self = this;

    storageRef.child("images/personalPic.jpg").getDownloadURL().then(function(url) {
      self.setState({personalPicURL: url});
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

    storageRef.child("images/aboutMe.jpg").getDownloadURL().then(function(url) {
      self.setState({aboutMeURL: url});
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

  render() {
    if (this.state.imageURL !== "" && this.state.aboutMeURL !== "") {
      return (
        <div>
          <div className="header">
            <Particles className="particles" params={particlesOptions}/>
            <div className="personalPicDiv">
              <img id="personalPic" alt="" src={this.state.personalPicURL}></img>
            </div>
            <div className="basicInfo">
              <h1>Tanay Sonthalia</h1>
              <h3>Developer • Engineer • Tinkerer</h3>
              <SocialIcon url="https://github.com/tsonthalia" bgColor="#000000"/>
              <SocialIcon url="https://www.linkedin.com/in/tanaysonthalia" style={{marginLeft: 1+"vw"}}/>
              <SocialIcon url="https://twitter.com/SonthaliaTanay" style={{marginLeft: 1+"vw"}}/>
            </div>
          </div>
          <div className="section inverted aboutMe">
            <h1>About Me</h1>
            <div className="leftCol">
              <p>My name is Tanay Sonthalia and I am currently a Senior at Mountain View High School. In my free time, I work on a lot of different projects by combining programming and engineering. You can check out some of them in my <a href="#programming">Programming</a> or <a href="#engineering">Engineering</a> page. I also teach different classes at OracleOpenWorld, CoderDojo, TechLab, and more. Tutorials for those classes can be found in the <a href="#tutorials">Tutorials</a> page. In addition to these, I also organize an annual high school hackathon called MVHacks.</p>
            </div>
            <div className="rightCol">
              <img id="aboutMePic" alt="" src={this.state.aboutMeURL}></img>
            </div>
          </div>
        </div>
      );
    } else {
      return ("");
    }
  }
}

export default Home;
