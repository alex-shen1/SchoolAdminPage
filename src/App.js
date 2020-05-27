import React, { Component } from 'react';
import './App.css';
import 'bootswatch/dist/slate/bootstrap.min.css';

import LoginPanel from "./components/LoginPanel"
import ClassDisplay from "./components/ClassDisplay"
import StudentDisplay from "./components/StudentDisplay"

import firebase from "./firebase"

import Button from "react-bootstrap/Button"

const testingData = {
  admins: [{
    name: "Admin Name",
    id: "CDZaxVJThgTf3mEMJMjuyP8IVeW2"
  }], //holds UIDs of admin accounts
  teachers: [{
    name: "Teacher Name",
    class: "Class 100",
    id: "tz9ehdvIDmRIF2IDHpv3XcMrznw2" // just teacher@teacher.com
  },
  {
    name: "Teacher Name2",
    class: "Class 200",
    id: "mZoHc5O4DTdFTMBo1Ax31Bq8PRv2"
  }],
  students: [
    {
      name: "Some Guy",
      firstName: "Some",
      lastName: "Guy",
      class: "Class 200",
      GPA: 4
    }
  ],
}

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
  resetData = () => {
    this.setState({ data: testingData },
      () => {
        this.setData();
      })
  }

  setData = () => {
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
    Object.keys(this.state.data.admins).map(index => {
      // console.log(admin)
      let admin = this.state.data.admins[index]
      if (admin.id.toString() === id.toString()) {
        console.log("admin logged in found")
        this.setState({ isAdmin: true, usersName:admin.name})
        // return true;
      }
    })
    // return false;
  }

  loadData = () => {
    console.log("loading")
    firebase.database().ref("data").once("value", snapshot => {
      if (snapshot && snapshot.exists()) {
        this.setState({ data: snapshot.val() }, () => {
          let id = firebase.auth().currentUser.uid;
        console.log(id);
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

          <StudentDisplay data={this.state.data} />
          <ClassDisplay data={this.state.data} />

        </div>
        <Button onClick={this.resetData}>RESET DATABASE (delete later)</Button>
      </div>
    );
  }
}

export default App;
