import React, { Component } from 'react';
import './App.css';
import 'bootswatch/dist/slate/bootstrap.min.css';

import LoginPanel from "./components/LoginPanel"
import ClassDisplay from "./components/ClassDisplay"

import firebase from "./firebase"

import Button from "react-bootstrap/Button"

const testingData = {
  admins: [{
    name: "AdminName",
    id: "CDZaxVJThgTf3mEMJMjuyP8IVeW2"
  }], //holds UIDs of admin accounts
  teachers: [{
    name: "TeacherName",
    class: "History",
    id: "tz9ehdvIDmRIF2IDHpv3XcMrznw2" // just teacher@teacher.com
  },
  {
    name: "TeacherName2",
    class: "Math",
    id: "mZoHc5O4DTdFTMBo1Ax31Bq8PRv2"
  }],
  students: [
    {
      name: "StudentName",
      class: "Math",
      GPA: 4
    }
  ],
}

console.log(testingData.teachers)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: null,
      data: testingData,
      validLogin: false,
      errorMSG: null,
      isAdmin: false
    }
  }
  setData = () => {
    this.setState({data: testingData})
    Object.keys(this.state.data).map(userCategory => {
      // console.log(userCategory)
      // console.log(this.state.data[userCategory]);
      // if (userCategory == "admins") {
      //   firebase.database().ref("admins").set(this.state.data["admins"])
      // }
      // else {
      this.state.data[userCategory].map(entry => {
        let DB_ref = firebase.database().ref("data/" + userCategory + "/" + entry.id)
        DB_ref.set(entry)
      })
      // }
    })
  }
  checkUserIsAdmin = (id) => {
    this.state.data.admins.map(admin => {
      console.log(admin)
      if (admin.id.toString() === id.toString()) {
        this.setState({ isAdmin: true })
        // return true;
      }
    })
    // return false;
  }

  loadData = () => {
    firebase.database().ref("data").once("value", snapshot => {
      if (snapshot && snapshot.exists()) {
        this.setState({ data: snapshot.val() })
      }
    })
  }
  handleLogin = (username, password) => {
    firebase.auth().signInWithEmailAndPassword(username, password)
      .then(() => {
        this.setState({ validLogin: true, })

        this.loadData();

        let id = firebase.auth().currentUser.uid;
        this.checkUserIsAdmin(id);

        let path = "data/";
        if (this.state.isAdmin) {
          path += "admins/" + id;
        }
        else {
          path += "teachers/" + id;
        }
        firebase.database().ref(path).once("value", snapshot => {
          if (snapshot && snapshot.exists()) {
            this.setState({ usersName: snapshot.val().name })
          }
        })

      }
      ).catch(error => {
        console.log(error.message);
        this.setState({ errorMSG: error.message.toString() })
      })

    console.log(firebase.auth().currentUser)
  }

  render() {
    return (
      <div className="App">
        Welcome, {this.state.usersName}
        <div className="info">
        <LoginPanel
          handleLogin={this.handleLogin}
          errorMSG={this.state.errorMSG}
          validLogin={this.state.validLogin} />
        <ClassDisplay
          data={this.state.data}
        />
        </div>
        <Button onClick={this.setData}>RESET DATABASE</Button>
      </div>
    );
  }
}

export default App;
