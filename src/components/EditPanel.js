import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { fieldFormatter } from "../data";

export default class EditPanel extends Component {
    constructor(props) {
        super(props);
    }

    // could turn this into functional component later but don't feel like doing it now

    render() {
        // console.log(fieldFormatter)
        return <div>
            <Modal show={this.props.editing} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title><h3>{(this.props.creatingNew ? "Create " : "Edit ") + this.props.editedObjectType}</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            {Object.keys(this.props.editedObject).map(field => {
                                if (field != "id") {
                                    return <div>
                                        <Form.Label>{fieldFormatter[field]}</Form.Label>
                                        <Form.Control
                                        onChange={(e) => {
                                            // console.log(e.target.value);
                                            this.props.editObject(field, e.target.value)
                                        }}
                                        type="textarea"
                                        placeholder={fieldFormatter[field]}
                                        value={this.props.editedObject[field]} /> <br />
                                    </div>
                                }
                            })}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={() => this.props.submitChanges()}>
                        {this.props.creatingNew ? ("Create " + this.props.editedObjectType) : "Save changes"}</Button>
                    <Button variant="secondary" onClick={this.props.closeModal}>
                        Cancel
                        </Button>
                </Modal.Footer>
            </Modal>
        </div>
    }
}