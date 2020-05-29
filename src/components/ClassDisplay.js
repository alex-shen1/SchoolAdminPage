import React, { Component } from 'react';

import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button";
import EditClassPanel from "./EditClassPanel"
export default class ClassDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: {},
        }
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.data != null && this.props.data != prevProps.data) {
            let uniqueClasses = {};
            try {
                Object.keys(this.props.data.teachers).map(index => {
                    let teacher = this.props.data.teachers[index];
                    if (!Object.keys(uniqueClasses).includes(teacher.class)) {
                        uniqueClasses[teacher.class] = {
                            teachers: [teacher],
                            students: []
                        };
                    }
                    else {
                        uniqueClasses[teacher.class].teachers.push(teacher)
                    }
                })
            } catch (e) {
                console.log("no teachers")
            }
            try {
                Object.keys(this.props.data.students).map(index => {
                    let student = this.props.data.students[index];
                    if (!Object.keys(uniqueClasses).includes(student.class)) {
                        uniqueClasses[student.class] = {
                            teachers: [],
                            students: [student]
                        };
                    }
                    else {
                        uniqueClasses[student.class].students.push(student)
                    }
                })
            } catch (e) {
                console.log("no students")
            }
            this.setState({ classes: uniqueClasses });
            this.props.db.ref("data/classes").set(uniqueClasses);
        }
    }

    render() {
        return <div className="classes">
            <h1>Classes</h1>
            {Object.keys(this.state.classes).map(classID => {
                return <Card>
                    <Card.Body>
                        <Card.Title>{classID} </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Taught by:
                        {" " + this.state.classes[classID].teachers.map(teacher => { return (teacher.firstName + " " + teacher.lastName + ", ") })}</Card.Subtitle>

                        {/* TODO: figure out how to handle cases w/ 0 teachers */}
                        <Card.Text>
                            Students: <br />
                            {this.state.classes[classID].students.map(student => { return (student.firstName + " " + student.lastName + ", ") })}
                        </Card.Text>

                        <EditClassPanel
                            classID={classID}
                            editedClass={this.state.classes[classID]}
                            db={this.props.db}
                            teachers={this.props.data != null ? this.props.data.teachers : null}/>
                    </Card.Body>
                </Card>
            })}

        </div>
    }
}