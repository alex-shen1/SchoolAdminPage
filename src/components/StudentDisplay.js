import React, { Component } from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import EditStudentPanel from "./EditStudentPanel";
import {fieldFormatter} from "../data";

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

            }
        }
    }
    closeModal = () => {
        this.setState({ editingStudent: false })
    }

    editStudent = (field, value) => {
        let temp = this.state.editedStudent;
        temp[field] = value;
        this.setState({ student: temp })
        console.log(field + " " + value);
    }

    saveStudent = () => {

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
                                        {Object.keys(student).map(field => {
                                            // console.log(fieldFormatter);
                                            return <div>
                                                {field != "id" ? fieldFormatter[field] + ": " + student[field] +"\n" : ""}
                                            </div>
                                        })}
                                        <Button disabled={!(this.props.isAdmin)}
                                        onClick={()=>this.props.removeStudent(student)}>Remove student</Button>

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        )
                    })}
            </Accordion>
            <Button className="createStudent" 
            onClick={() => this.setState({ editingStudent: true })}
            disabled={!(this.props.isAdmin)}>
                Create new student
            </Button>
            <EditStudentPanel
                editingStudent={this.state.editingStudent}
                closeModal={this.closeModal}
                editStudent={this.editStudent}
                editedStudent={this.state.editedStudent} />
        </div>
    }
}