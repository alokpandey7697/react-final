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
    this.state = { Username: '', Password: '', IsloggedIn: false, displayConfirmationModal: false, deleteMessage: '', UsernameInvalid: '', PasswordInvalid: '' };
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
    this.setState({ Username: '', Password: '', IsloggedIn: false, displayConfirmationModal: false, deleteMessage: '', UsernameInvalid: '', PasswordInvalid: '' })

  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ [e.target.name + "Invalid"]: '' })
  }

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

      fetch('https://localhost:44392/api/Authorization/Login', requestOptions)
        // .then(response => response.json())
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
    if (!this.state.IsloggedIn) {
      return (
        <div class="d-flex justify-content-center mt-5 pt-5">
          <div class="card w-50">
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
                    <Col sm={3}>
                    </Col>
                    <Col sm={3}>
                      <button type="button" onClick={this.handleLogin} className="btn btn-success">Login</button>
                    </Col>
                    <Col sm={3}>
                      <Button color="danger">Cancel</Button>
                    </Col>
                    <Col sm={3}>
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

            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
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
