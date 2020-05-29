import React, { Component } from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import EditPanel from "./EditPanel";


export default class PeopleDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: {},
            editingStudent: false,
            editedStudent: {
                firstName: "",
                lastName: "",
                class: "",
                grade: "",
                GPA: "",
                id: ""
            },
            // editingID: null,
            creatingNewStudent: false // this shouldn't matter
        }
    }
    closeModal = () => this.setState({ editingStudent: false })

    editObject = (field, value) => {
        let temp = this.state.editedStudent;
        temp[field] = value;
        this.setState({ editedStudent: temp })
        // console.log(field + " " + value);
    }

    submitChanges = () => {
        if(this.state.creatingNewStudent){
        this.props.addObject(this.state.editedStudent);
        }
        else{
            this.props.editObject(this.state.editedStudent)
        }
        this.closeModal();
    }

    openEditMenu = (student) => {
        let temp = this.state.editedStudent;
        Object.keys(student).map(field => {
            temp[field] = student[field]
        })
        // using temp to preserve order
        this.setState({
            editedStudent: temp,
            creatingNewStudent: false,
        },
            () => this.setState({ editingStudent: true }))
        // setting state editingStudent must be callback because these need to run in order
    }
    render() {
        let count = 0;
        // console.log(typeof this.props.formatData)
        return <div className="people">
            <Accordion >
                {this.props.people != null && this.props.people != null &&
                    Object.keys(this.props.people).map(index => {
                        let student = this.props.people[index];
                        return (
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={count + ""}>
                                        {student.firstName + " " + student.lastName}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={count++ + ""}>
                                    <Card.Body>
                                        {Object.keys(this.props.formatData(student)).map(field => {
                                            return <div>
                                                {!["id","firstName","lastName"].includes(field) ? this.props.fieldFormatter[field] + ": " + (student)[field] + "\n" : ""}
                                            </div>
                                        })}

                                        <Button
                                            disabled={!(this.props.isAdmin)}
                                            onClick={() => this.openEditMenu(student)}>{"Edit " + this.props.personType.toLowerCase()}</Button>
                                        <Button
                                            disabled={!(this.props.isAdmin)}
                                            onClick={() => this.props.removeObject(student)}>{"Remove " + this.props.personType.toLowerCase()}</Button>

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        )
                    })}
            </Accordion>
            <Button className="createStudent"
                onClick={() => this.setState({ editingStudent: true, creatingNewStudent: true })}
                disabled={!(this.props.isAdmin)}>
                {"Create new " + this.props.personType.toLowerCase()}
            </Button>
            <EditPanel
                currentlyEditing={this.state.editingStudent}
                closeModal={this.closeModal}
                editObject={this.editObject}
                editedObject={this.state.editedStudent}
                submitChanges={this.submitChanges}
                creatingNew={this.state.creatingNewStudent}
                editedObjectType={this.props.personType} 
                fieldFormatter={this.props.fieldFormatter}/>
        </div>
    }
}