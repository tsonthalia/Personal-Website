import React, { Component } from "react";
import firebase from "./firebase.js";
import "../styles/Tabs.css";

import {CardColumns, Card, Button} from "react-bootstrap";

class Engineering extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      urls: [],
      cards: [],
    }

    let self = this;
    var db = firebase.firestore();

    db.collection("engineering").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.data().name);
            if (doc.data().photosVideos !== undefined && doc.data().documentation !== undefined) {
              self.state.cards.push(<Card key={doc.data().name} bg="light" className="text-center card">
                                      <Card.Header className='cardHeader'>{doc.data().name}</Card.Header>
                                      <Card.Img variant="top" src={doc.data().url} />
                                      <Card.Body>
                                        <Card.Text className='cardText'>{doc.data().description}</Card.Text>
                                      </Card.Body>
                                      <Card.Footer className="text-muted">
                                        <Button variant="primary" href={doc.data().photosVideos} target="_blank">Photos & Videos</Button>
                                        <Button variant="primary" href={doc.data().documentation} target="_blank" style={{marginLeft: 1+"vw"}}>Documentation</Button>
                                      </Card.Footer>
                                    </Card>);
            } else if (doc.data().photosVideos !== undefined) {
              self.state.cards.push(<Card key={doc.data().name} bg="light" className="text-center card">
                                      <Card.Header className='cardHeader'>{doc.data().name}</Card.Header>
                                      <Card.Img variant="top" src={doc.data().url} />
                                      <Card.Body>
                                        <Card.Text className='cardText'>{doc.data().description}</Card.Text>
                                      </Card.Body>
                                      <Card.Footer className="text-muted">
                                        <Button variant="primary" href={doc.data().photosVideos} target="_blank">Photos & Videos</Button>
                                      </Card.Footer>
                                    </Card>);
            } else if (doc.data().documentation !== undefined) {
              self.state.cards.push(<Card key={doc.data().name} bg="light" className="text-center card">
                                      <Card.Header className='cardHeader'>{doc.data().name}</Card.Header>
                                      <Card.Img variant="top" src={doc.data().url} />
                                      <Card.Body>
                                        <Card.Text>{doc.data().description}</Card.Text>
                                      </Card.Body>
                                      <Card.Footer className="text-muted">
                                        <Button variant="primary" href={doc.data().documentation} target="_blank">Documentation</Button>
                                      </Card.Footer>
                                    </Card>);
            } else {
              self.state.cards.push(<Card key={doc.data().name} bg="light" className="text-center card">
                                      <Card.Header className='cardHeader'>{doc.data().name}</Card.Header>
                                      <Card.Img variant="top" src={doc.data().url} />
                                      <Card.Body>
                                        <Card.Text className='cardText'>{doc.data().description}</Card.Text>
                                      </Card.Body>
                                    </Card>);
            }

        });
        self.setState({cards: self.state.cards});
    });
  }

  render() {
    return (
      <div className="page">
        <h1 className="pageTitle">Engineering</h1>
        <CardColumns>
          {this.state.cards.map((card, index) => (
              card
          ))}
        </CardColumns>
      </div>
    );
  }
}

export default Engineering;
