import React, { Component } from "react";
import StudentDisplay from "./StudentDisplay"

export default class PersonInfoDisplay extends Component {
    render() {
        return <div>
            <StudentDisplay
                data={this.props.data}
                removeStudent={this.props.removeStudent}
                addStudent={this.props.addStudent}
                editStudent={this.props.editStudent}
                isAdmin={this.props.isAdmin} />
        </div>
    }
}