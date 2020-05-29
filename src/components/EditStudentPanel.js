import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { fieldFormatter } from "../data";

export default class EditStudentPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // student: {
            //     "First Name": "",
            //     "Last Name": "",
            //     "Grade": "",
            //     "GPA": ""
            // },
            modalActive: false
        }
    }

    render() {
        // console.log(fieldFormatter)
        return <div>
            <Modal show={this.props.editingStudent} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title><h3>{this.props.creatingNewStudent ? "Create new student" : "Edit student information"}</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            {Object.keys(this.props.editedStudent).map(field => {
                                if (field != "id") {
                                    return <div>
                                        <Form.Label>{fieldFormatter[field]}</Form.Label>
                                        <Form.Control
                                        onChange={(e) => {
                                            // console.log(e.target.value);
                                            this.props.editStudent(field, e.target.value)
                                        }}
                                        type="textarea"
                                        placeholder={fieldFormatter[field]}
                                        value={this.props.editedStudent[field]} /> <br />
                                    </div>
                                }
                            })}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={this.props.creatingNewStudent ? "info" : "success"} onClick={() => this.props.submitChanges()}>
                        {/* {console.log(this.props.creatingNewStudent)} */}
                        {this.props.creatingNewStudent ? "Create student" : "Edit student"}</Button>
                    <Button variant="secondary" onClick={this.props.closeModal}>
                        Cancel
                        </Button>
                </Modal.Footer>
            </Modal>
        </div>
    }
}