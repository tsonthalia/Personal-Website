import React, { Component } from "react";
import firebase from "./firebase.js";
import "../styles/Main.css";

import {Card, Button} from "react-bootstrap";

class CommunityService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
    }

    let self = this;
    var db = firebase.firestore();

    db.collection("communityService").orderBy("date", "desc").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var keys = Object.keys(doc.data())
            var newKeys = []
            for (var index in keys) {
              if (keys[index] !== "date" && keys[index] !== "description" && keys[index] !== "name" && keys[index] !== "url") {
                newKeys.push(keys[index])
              }
            }

            self.state.cards.push(
                <Card key={doc.data().name} className="card">
                    <Card.Img variant="top" src={doc.data().url} />
                    <Card.Body>
                        <Card.Title className="cardTitle">{doc.data().name}</Card.Title>
                        <Card.Text className='cardText'>{doc.data().description}</Card.Text>
                        <div className="cardLinks">
                            {newKeys.map((key, index) => (
                                <Button key={index} className='cardLink' variant="link" href={doc.data()[key]} target="_blank" onClick={() => self.logClick(key, doc.data().name)}>{key}</Button>
                            ))}
                        </div>
                    </Card.Body>
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
        <h1 className="pageTitle">Community Service</h1>
        <div className="projGrid">
          {this.state.cards}
        </div>
      </div>
    );
  }
}

export default CommunityService;
