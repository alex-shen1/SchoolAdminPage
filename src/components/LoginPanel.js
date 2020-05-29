import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
export default class LoginPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
    }

    handleClose = () => {
        // console.log(typeof this.state.username)
        this.setState({ modalActive: false })
    }

    handleLoginButton = () => {
        this.props.handleLogin(this.state.username, this.state.password)        
    }

    // temporary testing method; remove later
    componentDidMount() { 
        this.props.handleLogin("admin@admin.com", "password") 
        // this.props.handleLogin("teacher@teacher.com", "password") 
    }

    render() {
        return <div>
            <Modal show={!this.props.validLogin} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h3>Log In</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                onChange={(e) => this.setState({ username: e.target.value })}
                                id="SearchText"
                                className="SearchBar"
                                type="textarea"
                                placeholder="Username" />
                                <br/>
                            <Form.Control
                                onChange={(e) => this.setState({ password: e.target.value })}
                                as="input"
                                type="password"
                                id="SearchText"
                                className="SearchBar"
                                // type="textarea"
                                placeholder="Password" />
                        </Form.Group>
                    </Form>
                    {this.props.errorMSG != null ? ("ERROR: " + this.props.errorMSG ): ""}
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={this.handleLoginButton}>Log in</Button>
                    {/* <Button variant="secondary" onClick={this.handleClose}> */}
                        {/* No thanks */}
                    {/* </Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    }
}