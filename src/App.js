import React, {useState} from 'react';  

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  
import fetch from 'cross-fetch';
import SubmitClaim from './Student/SubmitClaim';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';  
import './App.css';  
import ClaimStatus from './Student/ClaimStatus';
import ViewBill from './Student/ViewBill';
import Welcome from './Student/Welcome';
import LogoutConfirmation from './Student/LogoutConfirmation';
import { trackPromise } from 'react-promise-tracker';
import { LoadingIndicator } from './Student/LoadIndicator';

class App extends React.Component {  
  constructor(props){
    super(props)
    this.state = {Username:'',Password:'',IsloggedIn:false,displayConfirmationModal:false,deleteMessage:''};
  }
 
  // Handle the displaying of the modal based on type and id
  showLogoutModal = () => {
  this.setState({deleteMessage:`Do you really want to Logut?`});
   this.setState({displayConfirmationModal:true});
    };
 
  // Hide the modal
   hideConfirmationModal = () => {
    this.setState({displayConfirmationModal:false});
  };
 
  // Handle the actual deletion of the item
   submitLogout = () => {
     
    this.setState({IsloggedIn:false});
    this.setState({displayConfirmationModal:false});
  };
 
handleChange= (e)=> {  
  this.setState({[e.target.name]:e.target.value});  
  }  

  handleLogin=()=>{  
       const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({  "username": this.state.Username,
    "password": this.state.Password })
};

trackPromise(

fetch('https://localhost:44392/api/Authorization/Login', requestOptions)
    // .then(response => response.json())
.then(json => {  
if(json.ok){  
  //userHasAuthenticated(true);

this.setState({Username:'',Password:'',IsloggedIn:true});
}  

else{  
  
alert('Username or Password is incorrect!');  
}  }) 

.catch((error) => {
})

);
 


}  
render(){
  if(!this.state.IsloggedIn){
    return ( <Container className="App">  
    <h4 className="PageHeading">Member Login</h4>  
    <Form className="form">  
      <Col>  
        <FormGroup row>  
          <Label for="Username" sm={2}>Username</Label>  
          <Col sm={10}>  
            <Input type="text" name="Username" onChange={this.handleChange} value={this.state.Username} placeholder="Enter Username" />  
          </Col>  
        </FormGroup>  
        <FormGroup row>  
          <Label for="Password" sm={2}>Password</Label>  
          <Col sm={10}>  
            <Input type="text" name="Password" onChange={this.handleChange} value={this.state.Password} placeholder="Enter Password" />  
          </Col>  
        </FormGroup>  
      </Col>  
      <Col>  
        <FormGroup row>  
          <Col sm={5}>  
          </Col>  
          <Col sm={1}>  
          <button type="button" onClick={this.handleLogin} className="btn btn-success">Login</button>  
          </Col>  
          <Col sm={1}>  
            <Button color="danger">Cancel</Button>{' '}  
          </Col>  
          <Col sm={5}>  
          </Col>  
        </FormGroup>  
      </Col>  
    </Form>  
  </Container> );
  }
  else {
    return ( 
      <div>
    <Router>  
      <div className="container">  
        <nav className="navbar navbar-expand-lg navheader">  
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
            <button class="btn btn-outline-success" onClick={this.showLogoutModal}>Logout</button>
            </ul>
          </div>  
        </nav> <br />  
        <Switch>  
          <Route path='/Welcome' component={Welcome}/>
          <Route path='/SubmitClaim' component={SubmitClaim} />
          <Route path='/ClaimStatus' component={ClaimStatus} />
          <Route path='/ViewBill' component={ViewBill} />
        </Switch>  
      </div>  
     

    </Router>
     <div>
      <LogoutConfirmation showModal={this.state.displayConfirmationModal} confirmModal={this.submitLogout} hideModal={this.hideConfirmationModal}  message={this.state.deleteMessage}  />
      <LoadingIndicator/>
      </div> 
    

      </div> );
  }
   

   
}
}  

export default App;  