import React, { Component } from "react";
import firebase from "./firebase.js";
import "../styles/Main.css";

import {CardColumns, Card, Button} from "react-bootstrap";

class WorkExperience extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [],
        }

        let self = this;
        var db = firebase.firestore();

        db.collection("workExperience").orderBy("date", "desc").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.data().name);
                // console.log(Object.keys(doc.data()));
                let keys = Object.keys(doc.data())
                let count = 0
                let newKeys = []

                for (let index in keys) {
                    if (
                        keys[index] !== "date" &&
                        keys[index] !== "description" &&
                        keys[index] !== "name" &&
                        keys[index] !== "url" &&
                        keys[index] !== "role" &&
                        keys[index] !== "startDate" &&
                        keys[index] !== "endDate"
                    ) {
                        newKeys.push(keys[index])
                    }
                }

                self.state.cards.push(
                    <Card key={doc.data().name} bg="light" border="dark" className="text-center card">
                        <Card.Header className='cardHeader'>
                            <Card.Title>{doc.data().role} @ {doc.data().name}</Card.Title>
                            <Card.Subtitle>{doc.data().startDate} - {doc.data().endDate}</Card.Subtitle>
                        </Card.Header>
                        <Card.Img variant="top" src={doc.data().url} />
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
                <h1 className="pageTitle">Work Experience</h1>
                <CardColumns>
                    {this.state.cards.map((card) => (
                        card
                    ))}
                </CardColumns>
            </div>
        );
    }
}

export default WorkExperience;