import React, { Component } from 'react';

import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button";
import EditClassPanel from "./EditClassPanel"
export default class ClassDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: null,
            editedClass: null
        }
    }

    componentDidUpdate = (prevProps) => {
        if (this.props != prevProps) {
            if (this.props.validLogin && prevProps.validLogin && this.props.validLogin) {
                this.props.db.ref("data/classes").on("value", snapshot => {
                    if (snapshot && snapshot.exists()) {
                        this.setState({ classes: snapshot.val() })
                        console.log(this.state.classes)
                    }
                })
            }
            if (this.props.data != null && prevProps.data != null) {
                if (this.props.data.classes == prevProps.data.classes) {
                    let uniqueClasses = {};
                    try {
                        Object.keys(this.props.data.teachers).map(index => {
                            let teacher = this.props.data.teachers[index];
                            if (!Object.keys(uniqueClasses).includes(teacher.class)) {
                                uniqueClasses[teacher.class] = {
                                    teachers: {},
                                    students: {}
                                };
                            }
                            uniqueClasses[teacher.class].teachers[teacher.id] = teacher;
                        })
                    } catch (e) {
                        console.log("no teachers")
                    }
                    try {
                        Object.keys(this.props.data.students).map(index => {
                            let student = this.props.data.students[index];
                            if (!Object.keys(uniqueClasses).includes(student.class)) {
                                uniqueClasses[student.class] = {
                                    teachers: {},
                                    students: {}
                                };
                            }
                            uniqueClasses[student.class].students[student.id] = student;
                        })
                    } catch (e) {
                        console.log("no students")
                    }
                    // this.setState({ classes: uniqueClasses });
                    this.props.db.ref("data/classes").set(uniqueClasses);
                }
            }
        }
    }

    exitEditing = () => {
        this.setState({ editedClass: null })
    }

    render() {
        return <div className="classes">
            <h1>Classes</h1>
            {this.state.classes !== null ? Object.keys(this.state.classes).map(classID => {
                return <Card>
                    <Card.Body>
                        <Card.Title>{classID} </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Taught by:
                        {this.state.classes[classID].teachers !== undefined ? " " + Object.values(this.state.classes[classID].teachers).map(teacher => {
                            return " " + (teacher.firstName + " " + teacher.lastName)
                        }) : " no one"}</Card.Subtitle>

                        {/* TODO: figure out how to handle cases w/ 0 teachers */}
                        <Card.Text>
                            Students: <br />
                            {Object.values(this.state.classes[classID].students).map(student => {
                                return (" " + student.firstName + " " + student.lastName)
                            })}
                        </Card.Text>
                        <Button disabled={!this.props.isAdmin} onClick={() => { console.log("changing"); this.setState({ editedClass: this.state.classes[classID], editClassName: classID }) }}>Edit class</Button>
                    </Card.Body>
                </Card>
            }) : ""}

            {this.state.editedClass != null ? <EditClassPanel
                className={this.state.editClassName}
                editedClass={this.state.editedClass}
                exitEditing={this.exitEditing}
                db={this.props.db}
                teachers={this.props.data != null ? this.props.data.teachers : null} /> : ""}
        </div>
    }
}