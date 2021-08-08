import React from 'react';  

import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  
import fetch from 'cross-fetch';
import { trackPromise } from 'react-promise-tracker';




class SubmitClaim extends React.Component{  
constructor(props){  
super(props)  
this.state = {  
MemberID:'',  
PolicyID:'',
BenefitID:'',
HospitalID:'',
ClaimAmt:'',
BenefitName:'',
Status:'',
FormFilled:false,
IsLoading:false
}  
}   
clearState=()=> {
  this.setState({MemberID:'',  
  PolicyID:'',
  BenefitID:'',
  HospitalID:'',
  ClaimAmt:'',
  BenefitName:'',
  Status:'',
  FormFilled:false,
  IsLoading:false});
}
SubmitClaim=()=>{  
  var url = new URL('https://localhost:44355/api/Members/submitClaim?')

  var params = {policyID:this.state.PolicyID,memberID:this.state.MemberID,benefitID:this.state.BenefitID,hospitalID:this.state.HospitalID,
    claimAmt:this.state.ClaimAmt,benefit:"\"" + this.state.BenefitName+ "\""} // or:
  
  url.search = new URLSearchParams(params).toString();
     const requestOptions = {
      method: 'POST',
  }; 
trackPromise(
  fetch(url,requestOptions)
  .then(res=>res.text())
       .then(data => {  
         this.setState({Status:data});
         this.setState({FormFilled:true});
      })  
 );
  
}  

handleChange= (e)=> {  
this.setState({[e.target.name]:e.target.value});  
}  
render() {  
  if(!this.state.FormFilled){
return (  
   <Container className="App">  
    <h4 className="PageHeading">Enter Claim Informations</h4>  
    <Form className="form">  
      <Col>  
        <FormGroup row>  
          <Label for="MemberID" sm={2}>MemberID</Label>  
          <Col sm={10}>  
            <Input type="text" name="MemberID" onChange={this.handleChange} value={this.state.MemberID} placeholder="Enter MemberID" />  
          </Col>  
        </FormGroup>   <br></br> 
        <FormGroup row>
        
          <Label for="PolicyID" sm={2}>PolicyID</Label>  
          <Col sm={10}>  
            <Input type="text" name="PolicyID" onChange={this.handleChange} value={this.state.PolicyID} placeholder="Enter PolicyID" />  
          </Col>  
        </FormGroup>  <br></br>
        <FormGroup row>  
       
          <Label for="BenefitID" sm={2}>BenefitID</Label>  
          <Col sm={10}>  
            <Input type="text" name="BenefitID" onChange={this.handleChange} value={this.state.BenefitID} placeholder="Enter BenefitID" />  
          </Col>  
        </FormGroup> <br></br>
        <FormGroup row>  
        
          <Label for="HospitalID" sm={2}>HospitalID</Label>  
          <Col sm={10}>  
            <Input type="text" name="HospitalID" onChange={this.handleChange} value={this.state.HospitalID} placeholder="Enter HospitalID" />  
          </Col>  
        </FormGroup> <br></br>
        <FormGroup row>  
        
          <Label for="ClaimAmt" sm={2}>ClaimAmt</Label>  
          <Col sm={10}>  
            <Input type="text" name="ClaimAmt" onChange={this.handleChange} value={this.state.ClaimAmt} placeholder="Enter ClaimAmt" />  
          </Col>  
        </FormGroup>   <br></br>
        <FormGroup row>  
      
          <Label for="BenefitName" sm={2}>BenefitName</Label>  
          <Col sm={10}>  
            <Input type="text" name="BenefitName" onChange={this.handleChange} value={this.state.BenefitName} placeholder="Enter BenefitName" />  
          </Col>  
        </FormGroup>  
      </Col>  
      <br></br>
      <Col>  
        <FormGroup row>  
       
          <Col sm={5}>  
          </Col>  
          <Col sm={1}>  
          <button type="button" onClick={this.SubmitClaim} className="btn btn-success">Submit</button>  
          </Col>  
          <Col sm={1}>  
            <Button color="danger" onClick={this.clearState}>Cancel</Button>
          </Col>  
          <Col sm={5}>  
          </Col>  
        </FormGroup>  
      </Col>  
    </Form>  
  </Container>  
);  
  }
  else {
return (<div><h1>Your current status {this.state.Status}</h1></div>);
}
}  
}  

export default SubmitClaim;  
