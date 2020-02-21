import React, { Component } from "react";
import firebase from "./firebase.js";
import "../styles/Main.css";

import {CardColumns, Card, Button} from "react-bootstrap";

class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
    }

    let self = this;
    var db = firebase.firestore();

    db.collection("projects").orderBy("date", "desc").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.data().name);
            // console.log(Object.keys(doc.data()));
            var keys = Object.keys(doc.data())
            var newKeys = []
            for (var index in keys) {
              if (keys[index] !== "date" && keys[index] !== "description" && keys[index] !== "name" && keys[index] !== "url") {
                newKeys.push(keys[index])
              }
            }

            self.state.cards.push(<Card key={doc.data().name} bg="light" border="dark" className="text-center card">
                                    <Card.Header className='cardHeader'>{doc.data().name}</Card.Header>
                                    <Card.Img variant="top" src={doc.data().url} />
                                    <Card.Body>
                                      <Card.Text className='cardText'>{doc.data().description}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="text-muted">
                                      {newKeys.map((key, index) => (
                                          <Button key={index} className='cardButton' variant="primary" href={doc.data()[key]} target="_blank" onClick={() => self.logClick(key, doc.data().name)}>{key}</Button>
                                      ))}
                                    </Card.Footer>
                                  </Card>);

        });
        self.setState({cards: self.state.cards});
    });
  }

  logClick(key, name) {
    const defaultAnalytics = firebase.analytics();
    defaultAnalytics.logEvent(key + " - " + name);
  }

  render() {
    return (
      <div className="page">
        <h1 className="pageTitle">Projects</h1>
        <CardColumns>
          {this.state.cards.map((card, index) => (
              card
          ))}
        </CardColumns>
        <footer style={{textAlign: "center"}}>Copyright &copy; 2020 Tanay Sonthalia</footer>
      </div>
    );
  }
}

export default Projects;
