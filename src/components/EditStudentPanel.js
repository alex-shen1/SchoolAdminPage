import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import {fieldFormatter} from "../data";

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
                    <Modal.Title><h3>Create new student</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            {Object.keys(this.props.editedStudent).map(field => {
                                return <div><Form.Control
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                        this.props.editStudent(field, e.target.value)
                                    }}
                                    type="textarea"
                                    placeholder={fieldFormatter[field]} /> <br/>
                                    </div>
                            })}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={()=>this.props.submitChanges()}>Create Student</Button>
                    <Button variant="secondary" onClick={this.props.closeModal}>
                        Cancel
                        </Button>
                </Modal.Footer>
            </Modal>
        </div>
    }
}