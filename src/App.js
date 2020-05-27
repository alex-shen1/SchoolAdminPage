import React, { Component } from 'react';
import './App.css';
import 'bootswatch/dist/slate/bootstrap.min.css';

import LoginPanel from "./components/LoginPanel"

import firebase from "./firebase"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        admins: ["AdminName"],
        teachers: [{
          name: "TeacherName",
          class: 1
        }],
        students: [
          {
            name: "StudentName",
            class: 1
          }
        ],
      },
      validLogin: false,
      errorMSG: null
     
    }
  }

  handleLogin = (username, password) => {
    // console.log(typeof username);
    // console.log(username + " " + password);
    firebase.auth().signInWithEmailAndPassword(username, password).then(
      this.setState({validLogin: true})
    ).catch(error =>{
      console.log(error.message);
      this.setState({errorMSG: error.message.toString()})
    })

    console.log(firebase.auth().currentUser)
  }

  render() {
    return (
      <div className="App">
        <LoginPanel 
        handleLogin={this.handleLogin}
        errorMSG={this.state.errorMSG}
        validLogin={this.state.validLogin}/>
      </div>
    );
  }
}

export default App;
