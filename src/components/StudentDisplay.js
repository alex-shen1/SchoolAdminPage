import React, { Component } from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default class ClassDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: {},
        }
    }
    render() {
        let count=0;
        return <div className="students">
            <Accordion >
                {this.props.data != null &&
                Object.keys(this.props.data.students).map(index => {
                    let student = this.props.data.students[index];
                    return (
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey={count + ""}>
                                    {student.name}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={count++ + ""}>
                                <Card.Body>
                                    GPA: {student.GPA} 
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    )
                })}
            </Accordion>
        </div>
    }
}