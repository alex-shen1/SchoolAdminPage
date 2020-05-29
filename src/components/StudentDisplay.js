import React, { Component } from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import EditPanel from "./EditPanel";
import { fieldFormatter, formatStudentData } from "../data";

export default class StudentDisplay extends Component {
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
    closeModal = () => {
        this.setState({ editingStudent: false })
    }

    editStudent = (field, value) => {
        let temp = this.state.editedStudent;
        temp[field] = value;
        this.setState({ student: temp })
        // console.log(field + " " + value);
    }

    submitChanges = () => {
        if(this.state.creatingNewStudent){
        this.props.addStudent(this.state.editedStudent);
        }
        else{
            this.props.editStudent(this.state.editedStudent)
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
        return <div className="students">
            <h1>Students</h1>
            <Accordion >
                {this.props.data != null && this.props.data.students != null &&
                    Object.keys(this.props.data.students).map(index => {
                        let student = this.props.data.students[index];
                        return (
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={count + ""}>
                                        {student.firstName + " " + student.lastName}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={count++ + ""}>
                                    <Card.Body>
                                        {Object.keys(formatStudentData(student)).map(field => {
                                            // console.log(fieldFormatter);
                                            return <div>
                                                {!["id","firstName","lastName"].includes(field) ? fieldFormatter[field] + ": " + (student)[field] + "\n" : ""}
                                            </div>
                                        })}

                                        <Button
                                            disabled={!(this.props.isAdmin)}
                                            onClick={() => this.openEditMenu(student)}>Edit student</Button>
                                        <Button
                                            disabled={!(this.props.isAdmin)}
                                            onClick={() => this.props.removeStudent(student)}>Remove student</Button>

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        )
                    })}
            </Accordion>
            <Button className="createStudent"
                onClick={() => this.setState({ editingStudent: true, creatingNewStudent: true })}
                disabled={!(this.props.isAdmin)}>
                Create new student
            </Button>
            <EditPanel
                editing={this.state.editingStudent}
                closeModal={this.closeModal}
                editObject={this.editStudent}
                editedObject={this.state.editedStudent}
                submitChanges={this.submitChanges}
                creatingNew={this.state.creatingNewStudent}
                editedObjectType="Student" />
        </div>
    }
}