import React, { Component } from 'react';
import firebase from './firebase.js';
import { SocialIcon } from 'react-social-icons';
import {CardColumns, Card, Button} from "react-bootstrap";

import '../styles/Home.css';

// import Particles from 'react-particles-js';
// const particlesOptions = {
//     "particles": {
//       "line_linked": {
//           "enable": true,
//           "distance": 200,
//           "color": "#47AEE3",
//           "opacity": 0.2,
//           "width": 2
//         },
//
//         "number": {
//             "value": 200
//         },
//         "size": {
//             "value": 4
//         },
//         "move": {
//           "enable": true,
//           "speed": 5,
//           "direction": "none",
//           "random": false,
//           "straight": false,
//           "out_mode": "out",
//           "bounce": false,
//           "attract": {
//             "enable": false,
//             "rotateX": 600,
//             "rotateY": 1200
//           }
//         }
//     },
// };

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();
var db = firebase.firestore();

// Create a storage reference from our storage service
var storageRef = storage.ref();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personalPicURL: "",
      aboutMeURL: "",
      currentProjects: [],
      favoriteProjects: [],
    }

    this.loadImages();
    this.loadData();
  }

  loadImages() {
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

  loadData() {
    let self = this;

    db.collection("currentProjects").get().then(function(querySnapshot2) {
      querySnapshot2.forEach(function(doc2) {
        // doc.data() is never undefined for query doc snapshots
        db.collection("projects").get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            if (doc.data().name === doc2.data().name) {

              // console.log(Object.keys(doc.data()));
              var keys = Object.keys(doc.data())
              var newKeys = []
              for (var index in keys) {
                if (keys[index] !== "date" && keys[index] !== "description" && keys[index] !== "name" && keys[index] !== "url") {
                  newKeys.push(keys[index])
                }
              }

              self.state.currentProjects.push(<Card key={doc.data().name} bg="light" border="dark" className="text-center card">
                                      <Card.Header className='cardHeader'>{doc.data().name}</Card.Header>
                                      <Card.Img variant="top" src={doc.data().url} />
                                      <Card.Body>
                                        <Card.Text className='cardText'>{doc.data().description}</Card.Text>
                                      </Card.Body>
                                      <Card.Footer className="text-muted">
                                        {newKeys.map((key, index) => (
                                            <Button variant="primary" href={doc.data()[key]} target="_blank" style={{marginLeft: 0.5+"vw", marginRight: 0.5+"vw"}} onClick={() => self.logClick(key, doc.data().name)}>{key}</Button>
                                        ))}
                                      </Card.Footer>
                                    </Card>);
            }
          });
          self.setState({currentProjects: self.state.currentProjects});
        });
      });
    });

    db.collection("favoriteProjects").get().then(function(querySnapshot2) {
      querySnapshot2.forEach(function(doc2) {
        // doc.data() is never undefined for query doc snapshots
        db.collection("projects").get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            if (doc.data().name === doc2.data().name) {

              // console.log(Object.keys(doc.data()));
              var keys = Object.keys(doc.data())
              var newKeys = []
              for (var index in keys) {
                if (keys[index] !== "date" && keys[index] !== "description" && keys[index] !== "name" && keys[index] !== "url") {
                  newKeys.push(keys[index])
                }
              }

              self.state.favoriteProjects.push(<Card key={doc.data().name} bg="light" border="dark" className="text-center card">
                                      <Card.Header className='cardHeader'>{doc.data().name}</Card.Header>
                                      <Card.Img variant="top" src={doc.data().url} />
                                      <Card.Body>
                                        <Card.Text className='cardText'>{doc.data().description}</Card.Text>
                                      </Card.Body>
                                      <Card.Footer className="text-muted">
                                        {newKeys.map((key, index) => (
                                            <Button variant="primary" href={doc.data()[key]} target="_blank" style={{marginLeft: 0.5+"vw", marginRight: 0.5+"vw"}} onClick={() => self.logClick(key, doc.data().name)}>{key}</Button>
                                        ))}
                                      </Card.Footer>
                                    </Card>);
            }
          });
          self.setState({favoriteProjects: self.state.favoriteProjects});
        });
      });
    });
  }

  logClick(key, name) {
    const defaultAnalytics = firebase.analytics();
    defaultAnalytics.logEvent(key + " - " + name);
  }

  //<Particles className="particles" params={particlesOptions}/>

  render() {
    if (this.state.imageURL !== "" && this.state.aboutMeURL !== "") {
      return (
        <div>
          <div className="header">

            <div className="personalPicDiv">
              <img id="personalPic" alt="" src={this.state.personalPicURL}></img>
            </div>
            <div className="basicInfo">
              <h1>Tanay Sonthalia</h1>
              <h3>Developer • Engineer • Tinkerer</h3>
              <SocialIcon url="https://github.com/tsonthalia" bgColor="#000000" target="_blank" onClick={() => this.logClick("Social", "GitHub")}/>
              <SocialIcon url="https://www.linkedin.com/in/tanaysonthalia" target="_blank" style={{marginLeft: 1+"vw"}} onClick={() => this.logClick("Social", "LinkedIn")}/>
              <SocialIcon url="https://twitter.com/SonthaliaTanay" target="_blank" style={{marginLeft: 1+"vw"}} onClick={() => this.logClick("Social", "Twitter")}/>
              <SocialIcon url="https://www.instagram.com/tanay.sonthalia/?hl=en" target="_blank" style={{marginLeft: 1+"vw"}} onClick={() => this.logClick("Social", "Instagram")}/>

            </div>
          </div>

          <div className="section inverted aboutMe">
            <h1>About Me</h1>
            <div className="leftCol">
              <p>My name is Tanay Sonthalia and I am currently a Senior at Mountain View High School. In my free time, I work on a lot of different projects by combining programming and engineering. You can check out some of them in my Programming or Engineering page. I also teach different classes at OracleOpenWorld, CoderDojo, TechLab, and more. Tutorials for those classes can be found in the Tutorials page. In addition to these, I also organize an annual high school hackathon called MVHacks.</p>
            </div>
            <div className="rightCol">
              <img id="aboutMePic" alt="" src={this.state.aboutMeURL}></img>
            </div>
          </div>

          <div className="section currentProjects">
            <h1>Current Projects</h1>
            <CardColumns>
              {this.state.currentProjects.map((card, index) => (
                  card
              ))}
            </CardColumns>
          </div>

          <div className="section inverted favoriteProjects">
            <h1>My Favorite Projects</h1>
            <CardColumns>
              {this.state.favoriteProjects.map((card, index) => (
                  card
              ))}
            </CardColumns>
            <footer style={{textAlign: "center"}}>Copyright &copy; 2020 Tanay Sonthalia</footer>
          </div>
        </div>
      );
    } else {
      return ("");
    }
  }
}

export default Home;
