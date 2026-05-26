import React, { Component } from "react";
import firebase from "./firebase.js";
import "../styles/Main.css";

import {CardColumns, Card, Button} from "react-bootstrap";

class Tutorials extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      urls: [],
      cards: [],
    }

    var db = firebase.firestore();
    let self = this;

    db.collection("tutorials").orderBy("date", "desc").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.data().name);
            //
            // console.log(Object.keys(doc.data()));
            var keys = Object.keys(doc.data())
            var newKeys = []
            for (var index in keys) {
              if (keys[index] !== "date" && keys[index] !== "description" && keys[index] !== "name" && keys[index] !== "url") {
                newKeys.push(keys[index])
              }
            }

            self.state.cards.push(
                <Card key={doc.data().name} bg="light" border="dark" className="text-center card">
                    <Card.Header className='cardHeader'>
                        <Card.Title>{doc.data().name}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text className='cardText'>{doc.data().description}</Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        {newKeys.map((key, index) => (
                            <Button key={index} className='cardButton' variant="primary" href={doc.data()[key]} target="_blank" onClick={() => self.logClick(key, doc.data().name)}>{key}</Button>
                        ))}
                    </Card.Footer>
                  </Card>
            );
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
        <h1 className="pageTitle">Tutorials</h1>
        <CardColumns>
          {this.state.cards.map((card) => (
              card
          ))}
        </CardColumns>
      </div>
    );
  }
}

export default Tutorials;
