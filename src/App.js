import React, { Component } from 'react';
import './App.css';
import 'bootswatch/dist/slate/bootstrap.min.css';

import LoginPanel from "./components/LoginPanel"
import ClassDisplay from "./components/ClassDisplay"
import InfoPanel from "./components/InfoPanel"
import firebase from "./firebase"

import Button from "react-bootstrap/Button"

import testingData from "./data"

// console.log(testingData.teachers)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      // data: testingData, // works without needing local data
      validLogin: false,
      errorMSG: null,
      isAdmin: false
    }
  }

  // resets Firebase data to testingData
  resetData = () => {
    firebase.database().ref("data").remove();
    this.setState({ data: testingData },
      () => {
        Object.keys(this.state.data).map(userCategory => {
          this.state.data[userCategory].map(entry => {
            let DB_ref = firebase.database().ref("data/" + userCategory + "/" + entry.id)
            DB_ref.set(entry)
          })
          // }
        })
      })
  }

  checkUserIsAdmin = (id) => {
    let isAdmin = false;
    try {
      Object.keys(this.state.data.admins).map(index => {
        // console.log(admin)
        let admin = this.state.data.admins[index]
        if (admin.id.toString() === id.toString()) {
          console.log("admin logged in")
          isAdmin = true;
          this.setState({ isAdmin: true, usersName: (admin.firstName + " " + admin.lastName) })
          // return true;
        }
      })
      if (!isAdmin) {
        let teacher = this.state.data.teachers[id];
        this.setState({ usersName: teacher.firstName + " " + teacher.lastName })
      }
    } catch (e) {
      console.log("no admins")
    }
    // return false;
  }

  loadData = () => {
    firebase.database().ref("data").on("value", snapshot => {
      if (snapshot && snapshot.exists()) {
        this.setState({ data: snapshot.val() }, () => {
          let id = firebase.auth().currentUser.uid;
          // console.log(id);
          this.checkUserIsAdmin(id);
        })
      }
    })
  }

  handleLogin = (username, password) => {
    firebase.auth().signInWithEmailAndPassword(username, password)
      .then(() => {
        this.setState({ validLogin: true, })

        this.loadData();
      }).catch(error => {
        console.log(error.message);
        this.setState({ errorMSG: error.message.toString() })
      })
    // let id = firebase.auth().currentUser.uid;
    // console.log(id);
    // this.checkUserIsAdmin(id);

    // let path = "data/";
    // if (this.state.isAdmin) {
    //   path += "admins/" + id;
    // }
    // else {
    //   path += "teachers/" + id;
    // }
    // console.log(path)
    // firebase.database().ref("data/admins"+id).once("value", snapshot => {
    //   if (snapshot && snapshot.exists()) {
    //     this.setState({ usersName: snapshot.val().name })
    //   }
    //   else{

    //   }
    // }).catch(firebase.database().ref("data/teachers"+id).once("value", snapshot => {
    //   if (snapshot && snapshot.exists()) {
    //     this.setState({ usersName: snapshot.val().name })
    //   }
    // }))
    // console.log(firebase.auth().currentUser)
  }

  render() {
    return (
      <div className="App">
        <div className="welcomeMessage">
          Welcome, {this.state.usersName}
        </div>
        <div className="info">
          <LoginPanel
            handleLogin={this.handleLogin}
            errorMSG={this.state.errorMSG}
            validLogin={this.state.validLogin} />

          <InfoPanel
            data={this.state.data}
            isAdmin={this.state.isAdmin}
            db={firebase.database()} />

          <ClassDisplay
            data={this.state.data}
            db={firebase.database()}
          />

        </div>
        <Button onClick={this.resetData}>RESET DATABASE (delete later)</Button>
      </div>
    );
  }
}

export default App;
