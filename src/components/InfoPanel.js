import React, { Component } from "react";
import PeopleDisplay from "./PeopleDisplay"
import Tab from 'react-bootstrap/Tab'

import Tabs from "react-bootstrap/Tabs"

import { studentFieldFormatter, formatStudentData, teacherFieldFormatter, formatTeacherData } from "../data";

export default class InfoPanel extends Component {
    render() {
        // console.log(typeof formatStudentData);
        return <div>
                        <h1>People</h1>
            <Tabs defaultActiveKey="students">
                <Tab eventKey="students" title="Students">
                    <PeopleDisplay id="studentDisplay"
                        people={this.props.data != null ? this.props.data.students : null}
                        removeObject={this.props.removeStudent}
                        addObject={this.props.addStudent}
                        editObject={this.props.editStudent}
                        isAdmin={this.props.isAdmin} 
                        formatData={formatStudentData}
                        fieldFormatter={studentFieldFormatter}
                        personType="Student"
                        db={this.props.db}/>
                </Tab>
                <Tab eventKey="teachers" title="Teachers">
                    <PeopleDisplay id="teacherDisplay"
                        people={this.props.data != null ? this.props.data.teachers : null}
                        removeObject={this.props.removeStudent}
                        addObject={this.props.addStudent}
                        editObject={this.props.editStudent}
                        isAdmin={this.props.isAdmin} 
                        formatData={formatTeacherData}
                        fieldFormatter={teacherFieldFormatter}
                        personType="Teacher"
                        db={this.props.db}
                    />
                </Tab>

            </Tabs>

        </div>
    }
}