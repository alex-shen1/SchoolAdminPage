import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


export default class EditClassPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // modalActive: false,
            selectedTeachers: null // holds IDs of teachers selected in the panel
        }
    }
    // closeModal = () => this.setState({ modalActive: false })

    submitChanges = () => {
        this.updateTeachers()
        this.props.exitEditing();
    }
    updateTeachers = () => {
        console.log(this.state.selectedTeachers)
        let updatedClassTeachers = {};
        this.state.selectedTeachers.map(id => {
            updatedClassTeachers[id] = this.props.teachers[id]
        })
        this.props.db.ref(`data/classes/${this.props.className}/teachers`).set(updatedClassTeachers)

        let updatedTeacherData = this.props.teachers;
        // console.log(updatedTeacherData)
        Object.keys(this.props.teachers).map(index => {
            if(this.state.selectedTeachers.includes(index)){
                updatedTeacherData[index].class = this.props.className
            }
            else if(updatedTeacherData[index.class] == this.props.className){
                console.log("removing teacher from class")
                updatedTeacherData[index.class] = null;
            }
        })
        console.log(updatedTeacherData);
        // this.props.db.ref("data/teachers").remove();
        this.props.db.ref("data/teachers").set(updatedTeacherData);
    }

    // TODO: figure out why this only triggers *after* the edit panel opens
    componentDidUpdate(prevProps) {
        if (this.props.editedClass !== prevProps.editedClass && this.props.editedClass !== null) {
            this.setState({ selectedTeachers: Object.keys(this.props.editedClass.teachers) })
            // console.log("updating list")
        }
    }

    componentDidMount = () => this.setState({ selectedTeachers: Object.keys(this.props.editedClass.teachers) })

    toggleSelectedTeacher = (id) => {
        // console.log(id)
        let temp = this.state.selectedTeachers;
        if (this.state.selectedTeachers.includes(id)) {
            temp.splice(temp.indexOf(id), 1)
            this.setState({ selectedTeachers: temp })
        }
        else {
            temp.push(id);
        }
        console.log(this.state.selectedTeachers)
    }

    // needs to run because setState doesn't work fast enough at first
    testIfChecked = (index) => {
        if (this.state.selectedTeachers === null) {
            return Object.keys(this.props.editedClass.teachers).includes(index)
        }
        return this.state.selectedTeachers.includes(index)
    }
    render() {
        // console.log(this.props.editedClass)
        return <div>
            <Modal show={this.props.editedClass != null} onHide={this.props.exitEditing}>
                <Modal.Header closeButton>
                    <Modal.Title><h3>Edit {this.props.className}</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <h5>Teachers:</h5>
                        {this.props.teachers !== null ? Object.keys(this.props.teachers).map(index => {
                            const teacher = this.props.teachers[index];
                            return <Form.Check
                                custom
                                type="checkbox"
                                id={`custom-checkbox-${index}`} // functionally equivalent to setting to teacherID
                                defaultChecked={this.testIfChecked(index)}
                                // checked={this.state.selectedTeachers.includes(index)}
                                onClick={() => this.toggleSelectedTeacher(index)}
                                // id="default-checkbox"
                                label={teacher.firstName + " " + teacher.lastName}
                            />
                            // </div>
                        }) : ""}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={this.submitChanges}>
                        Save changes</Button>
                    <Button variant="secondary" onClick={this.props.exitEditing}>
                        Cancel
                        </Button>
                </Modal.Footer>
            </Modal>
        </div>
    }
}