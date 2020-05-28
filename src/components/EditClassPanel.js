import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


export default class EditClassPanel extends Component {
constructor(props){
    super(props);
    this.state = {
        modalActive: false
    }
}
    closeModal = ()=> this.setState({modalActive:false})
    render(){
    return <div>
        <Button onClick={()=>this.setState({modalActive:true})}>Edit class</Button>
        <Modal show={this.state.modalActive} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title><h3>Edit class</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Form>
                        <Form.Group>
                            {Object.keys(this.props.editedStudent).map(field => {
                                if (field != "id") {
                                    return <div>
                                        <Form.Label>{fieldFormatter[field]}</Form.Label>
                                        <Form.Control
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                            this.props.editStudent(field, e.target.value)
                                        }}
                                        type="textarea"
                                        placeholder={fieldFormatter[field]}
                                        value={this.props.editedStudent[field]} /> <br />
                                    </div>
                                }
                            })}
                        </Form.Group>
                    </Form> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={this.closeModal}>
                        Save changes</Button>
                    <Button variant="secondary" onClick={this.closeModal}>
                        Cancel
                        </Button>
                </Modal.Footer>
            </Modal>
    </div>
}
}