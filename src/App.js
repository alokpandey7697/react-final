import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';
import fetch from 'cross-fetch';
import SubmitClaim from './Student/SubmitClaim';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './App.css';
import ClaimStatus from './Student/ClaimStatus';
import ViewBill from './Student/ViewBill';
import Welcome from './Student/Welcome';
import LogoutConfirmation from './Student/LogoutConfirmation';
import { trackPromise } from 'react-promise-tracker';
import { LoadingIndicator } from './Student/LoadIndicator';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Username: '', Password: '', IsloggedIn: false, displayConfirmationModal: false, deleteMessage: '', UsernameInvalid: '', PasswordInvalid: '',
      // memberName: '', memberAddress1: '', memberAddress2: '', memberCity: '', memberPhone: '', username: '', password: '', memberNameInvalid: '', memberAddress1Invalid: '', memberAddress2Invalid: '', memberCityInvalid: '',
      // memberPhoneInvalid: '', usernameInvalid: '', passwordInvalid: '',register: false
    };
  }

  // Handle the displaying of the modal based on type and id
  showLogoutModal = () => {
    this.setState({ deleteMessage: `Do you really want to Logut?` });
    this.setState({ displayConfirmationModal: true });
  };

  // Hide the modal
  hideConfirmationModal = () => {
    this.setState({ displayConfirmationModal: false });
  };

  // Handle the actual deletion of the item
  submitLogout = () => {
    this.setState({
      Username: '', Password: '', IsloggedIn: false, displayConfirmationModal: false, deleteMessage: '', UsernameInvalid: '', PasswordInvalid: '',
      // memberName: '', memberAddress1: '', memberAddress2: '', memberCity: '', memberPhone: '', username: '', password: '', memberNameInvalid: '', memberAddress1Invalid: '', memberAddress2Invalid: '', memberCityInvalid: '',
      // memberPhoneInvalid: '', usernameInvalid: '', passwordInvalid: ''
    })

  };
  // resetState = () => {
  //   this.setState({
  //     Username: '', Password: '', IsloggedIn: false, register: false, displayConfirmationModal: false, deleteMessage: '', UsernameInvalid: '', PasswordInvalid: '',
  //      memberName: '', memberAddress1: '', memberAddress2: '', memberCity: '', memberPhone: '', username: '', password: '', memberNameInvalid: '', memberAddress1Invalid: '', memberAddress2Invalid: '', memberCityInvalid: '',
  //      memberPhoneInvalid: '', usernameInvalid: '', passwordInvalid: ''
  //   });
  // }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ [e.target.name + "Invalid"]: '' })
  }
  // handleRegister = () => {
  //   if (this.state.memberName == "") {
  //     this.setState({ memberNameInvalid: "Please enter memberName." });
  //     return;
  //   }
  //   else if (this.state.memberAddress1 == "") {
  //     this.setState({ memberAddress1Invalid: "Please enter memberAddress1." });
  //     return;
  //   }
  //   else if (this.state.memberAddress2 == "") {
  //     this.setState({ memberAddress2Invalid: "Please enter memberAddress2." });
  //     return;

  //   }
  //   else if (this.state.memberCity == "") {
  //     this.setState({ memberCityInvalid: "Please enter memberCity." });
  //     return;
  //   }
  //   else if (this.state.memberPhone == "") {
  //     this.setState({ memberPhoneInvalid: "Please enter memberPhone." });
  //     return;
  //   }
  //   else if (this.state.username == "") {
  //     this.setState({ usernameInvalid: "Please enter username." });
  //     return;
  //   }
  //   else if (this.state.password == "") {
  //     this.setState({ passwordInvalid: "Please enter password." });
  //     return;
  //   }

  //   var url = new URL('https://membermicroservice.azurewebsites.net/api/Members/registration?')
  //   var params = {
  //     memberName: this.state.memberName, memberAddress1: this.state.memberAddress1, memberAddress2: this.state.memberAddress2, memberCity: this.state.memberCity, memberPhone: this.state.memberPhone,
  //     username: this.state.username, password: this.state.password
  //   } // or:

  //   url.search = new URLSearchParams(params).toString();
  //   const requestOptions = {
  //     method: 'POST',
  //   };

  //   trackPromise(
  //     fetch(url, requestOptions)
  //       .then(res => {
  //         if (res.ok) {
  //           alert("Registered Sucessfully!");


  //           this.resetState();
  //           return res.text();
  //         }
  //         else {
  //           alert("Invalid registration details provided! Please retry.")

  //         }
  //       })

  //       .catch((error) => {
  //       })
  //   );



  // }
  handleLogin = () => {
    if (this.state.Username == '') {
      this.setState({ UsernameInvalid: "Please enter Username." });
      return;
    }
    else if (this.state.Password == '') {
      this.setState({ PasswordInvalid: "Please enter Password" });
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "username": this.state.Username,
        "password": this.state.Password
      })
    };

    trackPromise(


      fetch('https://claimsmgmtauthorizationapi.azurewebsites.net/', requestOptions)

        .then(json => {
          if (json.ok) {
            //userHasAuthenticated(true);
            this.setState({ PropsUsername: this.state.Username });
            this.setState({ Username: '', Password: '', IsloggedIn: true });
          }

          else {

            alert('Username or Password is incorrect!');
          }
        })
        .catch((error) => {
        })

    );
  }

  render() {
    // if (this.state.register) {
    //   return (<div class="d-flex justify-content-center mt-2 ">
    //     <div class="card w-75">
    //       <div class="card-header bg-primary text-white text-center">
    //         <h3  >Enter Registration Information</h3>
    //       </div>
    //       <div class="card-body">


    //         <Form className="form">
    //           <Col>
    //             <FormGroup row>
    //               <Label for="memberName" sm={3}>MemberName</Label>
    //               <Col sm={8}>
    //                 <Input type="text" name="memberName" onChange={this.handleChange} value={this.state.memberName} placeholder="Enter MemberName" />
    //                 <span style={{ color: "red" }}>{this.state.memberNameInvalid}</span>
    //               </Col>
    //             </FormGroup>   <br></br>
    //             <FormGroup row>

    //               <Label for="memberAddress1" sm={3}>memberAddress1</Label>
    //               <Col sm={8}>
    //                 <Input type="text" name="memberAddress1" onChange={this.handleChange} value={this.state.memberAddress1} placeholder="Enter memberAddress1" />
    //                 <span style={{ color: "red" }}>{this.state.memberAddress1Invalid}</span>
    //               </Col>
    //             </FormGroup>  <br></br>
    //             <FormGroup row>

    //               <Label for="memberAddress2" sm={3}>memberAddress2</Label>
    //               <Col sm={8}>
    //                 <Input type="text" name="memberAddress2" onChange={this.handleChange} value={this.state.memberAddress2} placeholder="Enter memberAddress2" />
    //                 <span style={{ color: "red" }}>{this.state.memberAddress2Invalid}</span>
    //               </Col>
    //             </FormGroup>  <br></br>
    //             <FormGroup row>

    //               <Label for="memberCity" sm={3}>memberCity</Label>
    //               <Col sm={8}>
    //                 <Input type="text" name="memberCity" onChange={this.handleChange} value={this.state.memberCity} placeholder="Enter memberCity" />
    //                 <span style={{ color: "red" }}>{this.state.memberCityInvalid}</span>
    //               </Col>
    //             </FormGroup> <br></br>
    //             <FormGroup row>

    //               <Label for="memberPhone" sm={3}>memberPhone</Label>
    //               <Col sm={8}>
    //                 <Input type="number" name="memberPhone" onChange={this.handleChange} value={this.state.memberPhone} placeholder="Enter memberPhone" />
    //                 <span style={{ color: "red" }}>{this.state.memberPhoneInvalid}</span>
    //               </Col>
    //             </FormGroup> <br></br>
    //             <FormGroup row>

    //               <Label for="username" sm={3}>username</Label>
    //               <Col sm={8}>
    //                 <Input type="text" name="username" onChange={this.handleChange} value={this.state.username} placeholder="Enter username" />
    //                 <span style={{ color: "red" }}>{this.state.usernameInvalid}</span>
    //               </Col>
    //             </FormGroup>
    //             <br></br>
    //             <FormGroup row>

    //               <Label for="password" sm={3}>password</Label>
    //               <Col sm={8}>
    //                 <Input type="text" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Enter password" />
    //                 <span style={{ color: "red" }}>{this.state.passwordInvalid}</span>
    //               </Col>
    //             </FormGroup>

    //           </Col>
    //           <br></br>
    //           <Col>
    //             <FormGroup row>

    //               <Col sm={3}>
    //               </Col>
    //               <Col sm={3}>
    //                 <button type="button" onClick={this.handleRegister} className="btn btn-success">Register</button>
    //               </Col>
    //               <Col sm={3}>
    //                 <button type="button" onClick={this.resetState} className="btn btn-danger">Cancel</button>
    //               </Col>
    //               <Col sm={3}>
    //               </Col>
    //             </FormGroup>
    //           </Col>
    //         </Form>

    //       </div>
    //     </div>
    //   </div >
    //   );
    // }
    // else
    if (!this.state.IsloggedIn) {
      return (
        <div class="d-flex justify-content-center mt-5 pt-5">
          <div class="card w-25">
            <div class="card-header bg-primary text-white text-center">
              <h3  >Member Login</h3>
            </div>
            <div class="card-body">
              <Form className="form ">
                <Col>
                  <FormGroup row>
                    <Label for="Username" sm={4}>Username</Label>
                    <Col sm={8}>
                      <Input type="text" name="Username" onChange={this.handleChange} value={this.state.Username} placeholder="Enter Username" />
                      <span style={{ color: "red" }}>{this.state.UsernameInvalid}</span>
                    </Col>
                  </FormGroup>
                  <br></br>

                  <FormGroup row>
                    <Label for="Password" sm={4}>Password</Label>
                    <Col sm={8}>
                      <Input type="password" name="Password" onChange={this.handleChange} value={this.state.Password} placeholder="Enter Password" />
                      <span style={{ color: "red" }}>{this.state.PasswordInvalid}</span>
                    </Col>
                  </FormGroup>
                </Col>
                <br></br>

                <Col>
                  <FormGroup row>
                    <Col sm={4}>
                    </Col>
                    <Col sm={4}>
                      <button type="button" onClick={this.handleLogin} className="btn btn-success">Login</button>
                    </Col>
                    {/* <Col sm={3}>
                      <button type="button" onClick={() => { this.setState({ register: true }) }} className="btn btn-primary">Clear</button>
                    </Col> */}
                    <Col sm={4}>
                    </Col>
                  </FormGroup>
                </Col>
              </Form>
              <LoadingIndicator />
            </div>
          </div>
        </div >
      );
    }

    else {
      return (
        <div>
          <Router>

            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <div className="collapse navbar-collapse" >
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to={'/Welcome'} className="nav-link">Welcome</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/SubmitClaim'} className="nav-link">SubmitClaim</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/ClaimStatus'} className="nav-link">ClaimStatus</Link>
                  </li>
                  <li className="nav-item" >
                    <Link to={'/ViewBill'} className="nav-link">ViewBill</Link>
                  </li>


                </ul>
                <ul className="navbar-nav ms-auto">
                  <button class="btn btn-danger " onClick={this.showLogoutModal}>Logout</button>
                </ul>
              </div>
            </nav> <br />
            <Switch>
              <Route path='/Welcome' render={(props) => (
                <Welcome {...props} Username={this.state.PropsUsername} />
              )} />
              <Route path='/SubmitClaim' component={SubmitClaim} />
              <Route path='/ClaimStatus' component={ClaimStatus} />
              <Route path='/ViewBill' component={ViewBill} />
            </Switch>

            <Redirect to="/Welcome" />
          </Router>
          <div>
            <LogoutConfirmation showModal={this.state.displayConfirmationModal} confirmModal={this.submitLogout} hideModal={this.hideConfirmationModal} message={this.state.deleteMessage} />
            <LoadingIndicator />
          </div>


        </div>);
    }



  }
}

export default App;
