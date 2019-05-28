import React, { Component } from 'react';
import './App.css';
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow
} from "@material-ui/core";
import * as _ from "lodash";
import FormComponent from './Form';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      selectedIndex: 0,
      selectedConnections: "0",
      showForm: false,
      tag: '',
      firstName: '',
      lastName: '',
      email: '',
      dept: '',
      age: '',
      designation: ''
    };
  }

  componentDidMount() {
    let url = "http://localhost:4000/Employee";
    fetch(url)
      .then(respone => respone.json())
      .then(data => {
        this.setState({ posts: data });
      })
  }

  GetAge = (birthYear) => {
    let age = (2019 - birthYear)
    return age;
  }

  getConnectionIdFromName = (connectionName) => {
    debugger;
    const employee = _.find(this.state.posts, {
      name: connectionName
    });
    return employee.EmpId;
  };

  handleClick = (id) => {
    const employee = _.find(this.state.posts, {
      EmpId: id
    });
    this.setState({ selectedIndex: id })

  };

  handleSelectedConnection = (selectedRow) => {
    let rowsSelected = selectedRow;
    this.setState({ selectedIndex: rowsSelected })
  }

  handleAddClick = (isEditConnection) => {
    this.setState({ showForm: true })
  }

  handleDeleteClick = () => {
    debugger;

    axios.delete(`http://localhost:4000/Employee/${this.state.selectedIndex}`)
      .then(resp => {
        console.log(resp.data)
      }).catch(error => {
        console.log(error);
      });

    fetch('http://localhost:4000/Employee')
      .then(respone => respone.json())
      .then(data => {

        this.setState({ posts: data });
      })
    //
    debugger;
    // const employee = _.find(this.state.posts, {
    //   EmpId: this.state.selectedIndex
    // });
    // var index = employee.EmpId;
    //if (index !== -1) {
    debugger;
    var a = this.state.posts.splice(this.state.selectedIndex, 1);
    this.setState({ posts: a });
    //}
  }

  handleEditClick = () => {
    const employee = _.find(this.state.posts, {
      EmpId: this.state.selectedIndex
    });
    var index = employee.EmpId;
    const newEmployee = {
      EmpId: index,
      EmpTagNumber: this.state.tag,
      FirstName: this.state.firstName,
      LastName: this.state.lastName,
      EmailAdress: this.state.email,
      Department: this.state.dept,
      Birthdate: this.state.age,
      Designation: this.state.designation
    }
    const a = this.state.posts.splice(index - 1, 1, newEmployee);
    this.setState({ posts: a });
    this.setState({ showForm: true })
  }

  /////

  handleAddEmplyeeClick = () => {
    debugger;
    //let url = "http://localhost:4000/Employee";
    //{`trc${index}isActive`}
    axios.post('http://localhost:4000/Employee', {
      "id": (this.state.posts.length + 1),
      "EmpId": (this.state.posts.length + 1),
      "EmpTagNumber": this.state.tag,
      "FirstName": this.state.firstName,
      "LastName": this.state.lastName,
      "EmailAdress": this.state.email,
      "Department": this.state.designation,
      "Birthdate": 28,
      "Designation": this.state.designation
    }).then(resp => {
      debugger;
      this.state.posts.push(resp.data);
      this.setState({ showForm: false });
      console.log(resp.data);
    }).catch(error => {
      console.log(error);
    });

    // debugger;
    // var employee = [{
    // EmpId: "3",
    // EmpTagNumber: this.state.tag,
    // FirstName: this.state.firstName,
    // LastName: this.state.lastName,
    // EmailAdress: this.state.email,
    // Department: this.state.dept,
    // Birthdate: this.state.age,
    // Designation: this.state.designation
    // }]
    // this.state.posts.push(employee[0]);
    // console.log(this.state.posts);
    // this.setState({ showForm: false });
  }

  emailChangeHandler = (event) => {
    this.setState({ email: event.target.value })
  }

  tagChangeHandler = (event) => {
    this.setState({ tag: event.target.value })
  }

  fNameChangeHandler = (event) => {
    this.setState({ firstName: event.target.value })
  }

  lNameChangeHandler = (event) => {
    this.setState({ lastName: event.target.value })
  }

  deptChangeHandler = (event) => {
    this.setState({ dept: event.target.value })
  }

  ageChangeHandler = (event) => {
    debugger;
    this.setState({ age: event.target.value })
  }

  desChangeHandler = (event) => {
    this.setState({ designation: event.target.value })
  }
  /////

  render() {
    return (
      <div>
        <div style={{ width: "100%", height: "40px" }}>
          <button
            id="btnaddConnection"
            style={{ width: "155px", display: "inline-block", marginTop: "10px", marginLeft: "28px" }}
            onClick={() => this.handleAddClick(false)}
          >
            <span style={{ cursor: "pointer" }}>
              Add Employee
          </span>
          </button>
          <button
            id="btnEditConnection"
            style={{ width: "155px", display: "inline-block", marginTop: "10px", marginLeft: "28px" }}
            onClick={() => this.handleAddClick()}
          >
            <span style={{ cursor: "pointer" }}>
              Edit Employee
          </span>
          </button>
          <button
            id="btnDeleteConnection"
            style={{ display: "inline-block", marginTop: "10px", marginLeft: "28px" }}
            onClick={() => this.handleDeleteClick()}
          >
            <span style={{ cursor: "pointer" }}>
              Delete Employee
          </span>
          </button>
        </div>

        <table
          id="tblConnectionList"
          onRowSelection={this.handleSelectedConnection}
        >
          <TableHead displaySelectAll={false}>
            <TableRow>
              <TableCell
                id={`thcName`}
                className="tableHeaderManageConnection">
                Emp tag Number
                </TableCell>
              <TableCell
                id={`thcName`}
                className="tableHeaderManageConnection">
                First Name
                </TableCell>
              <TableCell
                id={`thcName`}
                className="tableHeaderManageConnection">
                Last Name
                </TableCell>
              <TableCell
                id={`thcName`}
                className="tableHeaderManageConnection">
                Email
                </TableCell>
              <TableCell
                id={`thcName`}
                className="tableHeaderManageConnection">
                Department
                </TableCell>
              <TableCell
                id={`thcName`}
                className="tableHeaderManageConnection">
                Age
                </TableCell>
              <TableCell
                id={`thcName`}
                className="tableHeaderManageConnection">
                Designation
                </TableCell>
            </TableRow>
          </TableHead>

          <TableBody deselectOnClickaway={false} showRowHover={true}>
            {this.state.posts.map((row, index) => (
              <TableRow
                key={index}
                id={`trc${row.id}`}
                hover
                onClick={event => this.handleClick(row.EmpId)}
              >
                <TableCell
                  id={`trc${row.name}`}>
                  {row.EmpTagNumber}
                </TableCell>
                <TableCell
                  id={`trc${row.name}`}>
                  {row.FirstName}
                </TableCell>
                <TableCell
                  id={`trc${row.name}`}>
                  {row.LastName}
                </TableCell>
                <TableCell
                  id={`trc${row.name}`}>
                  {row.EmailAdress}
                </TableCell>
                <TableCell
                  id={`trc${row.name}`}>
                  {row.Department}
                </TableCell>
                <TableCell
                  id={`trc${row.name}`}>
                  {this.GetAge(1995)}
                </TableCell>
                <TableCell
                  id={`trc${row.name}`}>
                  {row.Designation}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </table>
        {this.state.showForm &&
          <FormComponent
            Employees={this.state.posts}
            emailChangeHandler={this.emailChangeHandler}
            fNameChangeHandler={this.fNameChangeHandler}
            lNameChangeHandler={this.lNameChangeHandler}
            deptChangeHandler={this.deptChangeHandler}
            ageChangeHandler={this.ageChangeHandler}
            tagChangeHandler={this.tagChangeHandler}
            handleAddEmplyeeClick={this.handleAddEmplyeeClick}
            desChangeHandler={this.desChangeHandler}
            handleEditClick={this.handleEditClick}
          />}
      </div>
    );
  };
}

export default App;
