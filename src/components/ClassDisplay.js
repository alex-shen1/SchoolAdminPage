import React, { Component } from 'react';

import Card from "react-bootstrap/Card"
export default class ClassDisplay extends Component {
    render() {
        return <div>
            <Card>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    }
}