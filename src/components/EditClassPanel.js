import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


export default class EditClassPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalActive: false
        }
    }
    closeModal = () => this.setState({ modalActive: false })
    
    submitChanges = () => {
        this.updateTeachers()
        this.closeModal();
    }
    updateTeachers = () => {
        Object.keys(this.props.teachers).map( index =>{
            let checkBox = document.getElementById(`custom-checkbox-${index}`)

            if(checkBox.checked){
                console.log(this.props.teachers[index].firstName)
            }
        })
    }
    
    render() {
        return <div>
            <Button onClick={() => this.setState({ modalActive: true })}>Edit class</Button>
            <Modal show={this.state.modalActive} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title><h3>Edit class</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <h5>Teachers:</h5>
                        {Object.keys(this.props.teachers).map(index => {
                            const teacher = this.props.teachers[index];
                            return    <Form.Check
                                    custom
                                    type="checkbox"
                                    id={`custom-checkbox-${index}`} // functionally equivalent to setting to teacherID
                                    checked={Object.keys(this.props.editedClass.teachers).includes(index)}
                                    // id="default-checkbox"
                                    label={teacher.firstName + " " + teacher.lastName}
                                />
                            // </div>
                        })}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={this.updateTeachers}>
                        Save changes</Button>
                    <Button variant="secondary" onClick={this.closeModal}>
                        Cancel
                        </Button>
                </Modal.Footer>
            </Modal>
        </div>
    }
}