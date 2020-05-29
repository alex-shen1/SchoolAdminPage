import React, { Component } from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import EditPanel from "./EditPanel";

import { studentTemplate, teacherTemplate } from "../data"

export default class PeopleDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: {},
            editingPerson: false,
            editedPerson: {},
            creatingNewPerson: false // this shouldn't matter
        }
    }

    removePerson = (removed_person) => {
        let categoryPath = this.props.personType.toLowerCase() + "s/"
        this.props.db.ref("data/" + categoryPath + removed_person.id).remove();
    }
    addPerson = (added_person) => {
        if (this.props.personType == "Student") {
            let new_id = 0;
            Object.keys(this.props.people).map(id => {
                if (new_id < parseInt(id)) {
                    new_id = parseInt(id) + 1;
                }
            })
            added_person["id"] = new_id;
            console.log(added_person);
            this.props.db.ref("data/students/" + added_person.id).set(added_person)
        }
    }
    insertEditedPerson = (edited_person) => {
        let categoryPath = this.props.personType.toLowerCase() + "s/"
        this.props.db.ref("data/" + categoryPath + edited_person.id).set(edited_person)
    }

    closeModal = () => this.setState({ editingPerson: false, editedPerson: {} })

    editField = (field, value) => {
        let temp = this.state.editedPerson;
        temp[field] = value;
        this.setState({ editedPerson: temp })
    }

    submitChanges = () => {
        if (this.state.creatingNewPerson) {
            // this.props.addObject(this.state.editedPerson);
            this.addPerson(this.state.editedPerson)
        }
        else {
            this.insertEditedPerson(this.state.editedPerson)
            // this.props.editField(this.state.editedPerson)
        }
        this.closeModal();
    }

    openEditMenu = (person) => {
        let temp = this.props.personType == "Student" ? studentTemplate : teacherTemplate;
        Object.keys(person).map(field => {
            temp[field] = person[field]
        })
        // using temp to preserve order
        this.setState({
            editedPerson: temp,
            creatingNewPerson: false,
        },
            () => this.setState({ editingPerson: true }))
        // setting state editingPerson must be callback because these need to run in order
    }

    openCreateMenu = () => {
        this.setState({ editedPerson: this.props.personType == "Student" ? studentTemplate : teacherTemplate, editingPerson: true, creatingNewPerson: true })
    }
    render() {
        let count = 0;
        // console.log(typeof this.props.formatData)
        return <div className="people">
            <Accordion >
                {this.props.people != null && this.props.people != null &&
                    Object.keys(this.props.people).map(index => {
                        let person = this.props.people[index];
                        return (
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={count + ""}>
                                        {person.firstName + " " + person.lastName}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={count++ + ""}>
                                    <Card.Body>
                                        {Object.keys(this.props.formatData(person)).map(field => {
                                            return <div>
                                                {!["id", "firstName", "lastName"].includes(field) ? this.props.fieldFormatter[field] + ": " + (person)[field] + "\n" : ""}
                                            </div>
                                        })}

                                        <Button
                                            disabled={!(this.props.isAdmin)}
                                            onClick={() => this.openEditMenu(person)}>{"Edit " + this.props.personType.toLowerCase()}</Button>
                                        <Button
                                            disabled={!(this.props.isAdmin)}
                                            onClick={() => this.removePerson(person)}>{"Remove " + this.props.personType.toLowerCase()}</Button>

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        )
                    })}
            </Accordion>

            <EditPanel
                currentlyEditing={this.state.editingPerson}
                closeModal={this.closeModal}
                editField={this.editField}
                editedObject={this.state.editedPerson}
                submitChanges={this.submitChanges}
                creatingNew={this.state.creatingNewPerson}
                editedObjectType={this.props.personType}
                fieldFormatter={this.props.fieldFormatter}
                db={this.props.db} />

            <div className="createPerson">
                <Button
                    onClick={() => this.openCreateMenu()}
                    disabled={!(this.props.isAdmin)}>
                    {"Create new " + this.props.personType.toLowerCase()}
                </Button>
            </div>
        </div>
    }
}