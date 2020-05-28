import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default class EditStudentPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {
                "First Name": "",
                "Last Name": "",
                "Grade": "",
                "GPA": ""
            },
            modalActive: false
        }
    }

    render() {
        return <div>


            <Modal show={this.props.editingStudent} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title><h3>Create new student</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            {Object.keys(this.state.student).map(field => {
                                return <div><Form.Control
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                        this.props.editStudent(field, e.target.value)
                                    }}
                                    type="textarea"
                                    placeholder={field} /> <br/>
                                    </div>
                            })}
                        </Form.Group>
                    </Form>
                    {this.props.errorMSG != null ? ("ERROR: " + this.props.errorMSG) : ""}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={this.handleLoginButton}>Create Student</Button>
                    <Button variant="secondary" onClick={this.props.closeModal}>
                        Cancel
                        </Button>
                </Modal.Footer>
            </Modal>
        </div>
    }
}