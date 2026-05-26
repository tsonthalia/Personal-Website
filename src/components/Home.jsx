import React, { Component } from 'react';
import firebase from './firebase.js';
import { SocialIcon } from 'react-social-icons';
import { Link } from 'react-router-dom';
import {Card, Button, Form} from "react-bootstrap";

import '../styles/Main.css';

var storage = firebase.storage();
var db = firebase.firestore();

var storageRef = storage.ref();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personalPicURL: "",
      aboutMeURL: "",
      recentProjects: [],
      contactName: "",
      contactEmail: "",
      contactSubject: "",
      contactMessage: "",
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
          break;
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;
        case 'storage/unknown':
          break;
      }
    });

    storageRef.child("images/aboutMe.jpg").getDownloadURL().then(function(url) {
      self.setState({aboutMeURL: url});
    }).catch(function(error) {
      // eslint-disable-next-line
      switch (error.code) {
        case 'storage/object-not-found':
          break;
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;
        case 'storage/unknown':
          break;
      }
    });
  }

  loadData() {
    let self = this;
    db.collection("projects").orderBy("date", "desc").limit(3).get().then(function(querySnapshot) {
      let cards = [];
      querySnapshot.forEach(function(doc) {
        const data = doc.data();
        const linkKeys = Object.keys(data).filter(
          (k) => k !== "date" && k !== "description" && k !== "name" && k !== "url"
        );
        cards.push(
          <Card key={data.name} className="card">
            <Card.Img variant="top" src={data.url} />
            <Card.Body>
              <Card.Title className="cardTitle">{data.name}</Card.Title>
              <Card.Text className="cardText">{data.description}</Card.Text>
              <div className="cardLinks">
                {linkKeys.map((key, i) => (
                  <Button
                    key={i}
                    className="cardLink"
                    variant="link"
                    href={data[key]}
                    target="_blank"
                    onClick={() => self.logClick(key, data.name)}
                  >
                    {key}
                  </Button>
                ))}
              </div>
            </Card.Body>
          </Card>
        );
      });
      self.setState({ recentProjects: cards });
    });
  }

  logClick(key, name) {
    const defaultAnalytics = firebase.analytics();
    defaultAnalytics.logEvent(key + " - " + name);
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  submitEmail = event => {
    let { contactName, contactEmail, contactSubject, contactMessage } = this.state;
    db.collection('emails').add({
      to: "tsonthalia@gmail.com",
      from: contactEmail,
      name: contactName,
      message: {
        subject: contactSubject,
        text: contactMessage,
      }
    }).then(() => {
      this.setState({contactName: "", contactEmail: "", contactSubject: "", contactMessage: ""})
    })

    event.preventDefault();
  }

  render() {
    if (this.state.imageURL !== "" && this.state.aboutMeURL !== "") {
      return (
        <div id="home">
          <div className="header">
            <div className="insideHeader">
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
          </div>

          <div className="section inverted aboutMe">
            <h1>About Me</h1>
            <div className="twoCols">
              <div className="leftCol">
                <p>
                  I'm a Junior at Georgia Tech studying Computer Science, with
                  concentrations in Intelligence and Information Internetworks.
                </p>
                <p>
                  Last summer I was a Product Management intern at Ciena, where I picked
                  up a high-level view of how software gets shipped across hardware-adjacent
                  teams.
                </p>
                <p>
                  In my free time I build things at the intersection of code and engineering
                  — most of them live on the projects page below. Reach me through the
                  contact form at the bottom.
                </p>
              </div>
              <div className="rightCol">
                <img id="aboutMePic" alt="" src={this.state.aboutMeURL}></img>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="sectionHead">
              <h1>Recent Projects</h1>
              <Link to="/projects" className="seeAll">See all projects →</Link>
            </div>
            <div className="projGrid">
              {this.state.recentProjects}
            </div>
          </div>

          <div className="section contact">
            <h1>Contact</h1>
            <Form onSubmit={this.submitEmail}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="John Doe" name="contactName" value={this.state.contactName} onChange={this.handleChange}/>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" name="contactEmail" value={this.state.contactEmail} onChange={this.handleChange}/>
              </Form.Group>

              <Form.Group>
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" placeholder="Subject" name="contactSubject" value={this.state.contactSubject} onChange={this.handleChange}/>
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows="3" placeholder="Message" name="contactMessage" value={this.state.contactMessage} onChange={this.handleChange}/>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      );
    } else {
      return ("");
    }
  }
}

export default Home;
