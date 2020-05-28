import React, { Component } from 'react';

import Card from "react-bootstrap/Card"
export default class ClassDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: {},
        }
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.data != null && this.props.data != prevProps.data) {
            console.log(this.props.data)
            let uniqueClasses = {};
            console.log(this.props.data.teachers)
            Object.keys(this.props.data.teachers).map(index => {
                let teacher = this.props.data.teachers[index];
                if (!Object.keys(uniqueClasses).includes(teacher.class)) {
                    uniqueClasses[teacher.class] = {
                        teachers: [teacher],
                        students: []
                    };
                }
                else{
                    uniqueClasses[teacher.class].teachers.push(teacher)
                }
            })
            Object.keys(this.props.data.students).map(index => {
                let student = this.props.data.students[index];
                uniqueClasses[student.class].students.push(student)
            })
            // for (let teacher of this.props.data.teachers){
            //     console.log(teacher)

            // }
            console.log(uniqueClasses)
            this.setState({ classes: uniqueClasses });
            this.props.classesRef.set(uniqueClasses);
        }
    }
    render() {
        return <div className="classes">
            {Object.keys(this.state.classes).map(classID => {
                return <Card>
                <Card.Body>
                    <Card.Title>{classID}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Taught by: {this.state.classes[classID].teachers[0].name}</Card.Subtitle>
                    <Card.Text>
                        Students: <br/>
                        {this.state.classes[classID].students.map(student => {return student.name})}
                    </Card.Text>
                </Card.Body>
            </Card>
            })}
            
        </div>
    }
}