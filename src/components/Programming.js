import React, { Component } from "react";
import firebase from "./firebase.js";
import "../styles/Programming.css";

import {CardColumns, Card} from "react-bootstrap";

class Programming extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      urls: [],
      cards: [],
    }

    let self = this;
    var db = firebase.firestore();

    db.collection("programming").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.data().name);
            self.state.cards.push(<Card key={doc.data().name} bg="light" className="text-center">
                          <Card.Header>{doc.data().name}</Card.Header>
                          <Card.Img variant="top" src={doc.data().url} />
                          <Card.Body>
                            <Card.Text>This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</Card.Text>
                          </Card.Body>
                        </Card>);
        });
        self.setState({cards: self.state.cards});
    });
  }

  render() {
    return (
      <div className="page">
        <h1 className="pageTitle">Programming</h1>
        <CardColumns>
          {this.state.cards.map((card, index) => (
              card
          ))}
        </CardColumns>
      </div>
    );
  }
}

export default Programming;
