import React , { useState } from 'react';  

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  
import fetch from 'cross-fetch';
import App from '../App';
function Login (){  
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [IsloggedIn, setLogIn] = useState(0);
 
 
//const { userHasAuthenticated } = useAppContext();
function handleLogin(){  

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({  "username": Username,
    "password": Password })
};
fetch('https://localhost:44392/api/Authorization/Login', requestOptions)
    // .then(response => response.json())
.then(json => {  
if(json.ok){  
  //userHasAuthenticated(true);
  console.log(json);
  alert("login sucessfull");

 alert("hello"+IsloggedIn);
}  

else{  
  console.log(json);
alert('Username or Password is incorrect!');  
}  }) 
.catch((error) => {
  console.log(error)
});
}  

return (  
  (IsloggedIn == 0)?
   <Container className="App">  
    <h4 className="PageHeading">Member Login</h4>  
    <Form className="form">  
      <Col>  
        <FormGroup row>  
          <Label for="Username" sm={2}>Username</Label>  
          <Col sm={10}>  
            <Input type="text" name="Username" onChange={(e) => setUsername(e.target.value)} value={Username} placeholder="Enter Username" />  
          </Col>  
        </FormGroup>  
        <FormGroup row>  
          <Label for="Password" sm={2}>Password</Label>  
          <Col sm={10}>  
            <Input type="text" name="Password" onChange={(e) => setPassword(e.target.value)} value={Password} placeholder="Enter Password" />  
          </Col>  
        </FormGroup>  
      </Col>  
      <Col>  
        <FormGroup row>  
          <Col sm={5}>  
          </Col>  
          <Col sm={1}>  
          <button type="button" onClick={handleLogin} className="btn btn-success">Login</button>  
          </Col>  
          <Col sm={1}>  
            <Button color="danger">Cancel</Button>{' '}  
          </Col>  
          <Col sm={5}>  
          </Col>  
        </FormGroup>  
      </Col>  
    </Form>  
  </Container>  :
  <App/>
);  
}  



export default Login;  
