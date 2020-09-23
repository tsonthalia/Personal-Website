import React, { Component } from 'react';
import firebase from './firebase.js';

import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "react-bootstrap";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Resume extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resume: '',
        };

        // Get a reference to the storage service, which is used to create references in your storage bucket
        let storage = firebase.storage();

        // Create a storage reference from our storage service
        let storageRef = storage.ref();

        let self = this;

        storageRef.child("resume.pdf").getDownloadURL().then(function (url) {
            self.setState({resume: url});
        }).catch(function (error) {
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
            console.log(error)
        });
    }

    render() {
        let { resume } = this.state;
        // let resume = './resume.pdf';
        return (
            resume !== '' ?
                (<div style={{marginTop: 10 + 'vh', marginBottom: 5 + 'vh', justifyContent: 'space-evenly', display: 'flex', alignItems: 'flex-start'}}>
                    <div>
                        <div style={{border: '3px solid black'}}>
                            <Document file={resume}>
                                <Page pageNumber={1} width={1000}/>
                            </Document>
                        </div>
                    </div>
                    <Button href={resume} target={"_blank"}>Download Resume</Button>

                </div>)
                    :
                (<div></div>)
        );
    }
}

export default Resume;