import React, { Component } from "react";
import StudentDisplay from "./StudentDisplay"
import Tab from 'react-bootstrap/Tab'

import Tabs from "react-bootstrap/Tabs"

export default class PersonInfoDisplay extends Component {
    render() {
        return <div>
                        <h1>People</h1>
            <Tabs defaultActiveKey="students">
                <Tab eventKey="students" title="Students">
                    <StudentDisplay
                        data={this.props.data}
                        removeStudent={this.props.removeStudent}
                        addStudent={this.props.addStudent}
                        editStudent={this.props.editStudent}
                        isAdmin={this.props.isAdmin} />
                </Tab>
                <Tab eventKey="teachers" title="Teachers">

                </Tab>

            </Tabs>

        </div>
    }
}