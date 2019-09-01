import React, { Component } from 'react';
import firebase from './firebase.js';

import '../styles/Home.css';

import Particles from 'react-particles-js';
const particlesOptions = {
    "particles": {
      "line_linked": {
          "enable": true,
          "distance": 200,
          "color": "#47AEE3",
          "opacity": 0.1,
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
      imageURL: "",
    }

    this.loadData();
  }

  loadData() {
    let self = this;

    storageRef.child("personalPic.jpeg").getDownloadURL().then(function(url) {
      self.setState({imageURL: url});
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
    if (this.state.imageURL !== "") {
      return (
        <div>
          <div className="header">
            <Particles className="particles" params={particlesOptions}/>
            <div className="personalPicDiv">
              <img id="personalPic" alt="" src={this.state.imageURL}></img>
            </div>
            <div className="basicInfo">
              <h1>Tanay Sonthalia</h1>
              <h3>Developer • Engineer • Tinkerer</h3>
            </div>
          </div>
          <div></div>
        </div>
      );
    } else {
      return ("");
    }
  }
}

export default Home;
