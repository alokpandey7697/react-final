import React from 'react';  
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  
import fetch from 'cross-fetch';
class ClaimStatus extends React.Component{  
constructor(props){  
super(props)  
this.state = {  
    ClaimID:'',  
    PolicyID:'',
    Status:''
}  
}   
Submit=()=>{  
    var url = new URL('https://localhost:44355/api/Members/getClaimStatus?')

    var params = {claimID:this.state.ClaimID,policyID:this.state.PolicyID} // or:
    
    url.search = new URLSearchParams(params).toString();
    
  
    fetch(url)
   
  .then(res=>res.text())
  .then(data => {  
    this.setState({Status:data});
 //   this.setState({ PremiumDue: response.premiumDue, PaymentDetails: response.paymentDetails, DueDate: response.dueDate, LastPremiumPaidDate: response.lastPremiumPaidDate,res:true });
   console.log(data);
  // console.log(response.data);

 }); 
//   axios.post('https://localhost:44355/api/Members/getClaimStatus?',null,{params:{}})  
// .then(json => {  
// if(json.data.Status==='Sucess'){  
//   console.log(json.data.Status);  
//   alert("Data Save Successfully");  
// this.props.history.push('/Studentlist')  
// }  
// else{  
// alert('Data not Saved');  
// debugger;  
// this.props.history.push('/Studentlist')  
// }  
//})  
}  

handleChange= (e)=> {  
this.setState({[e.target.name]:e.target.value});  
}  

render() {  

  if(this.state.Status === ''){
    return (<Container className="App">  
    <h4 className="PageHeading">Enter Student Informations</h4>  
    <Form className="form">  
      <Col>  
        <FormGroup row>  
          <Label for="ClaimID" sm={2}>ClaimID</Label>  
          <Col sm={10}>  
            <Input type="text" name="ClaimID" onChange={this.handleChange} value={this.state.ClaimID} placeholder="Enter ClaimID" />  
          </Col>  
        </FormGroup>  
        <FormGroup row>  
          <Label for="PolicyID" sm={2}>PolicyID</Label>  
          <Col sm={10}>  
            <Input type="text" name="PolicyID" onChange={this.handleChange} value={this.state.PolicyID} placeholder="Enter PolicyID" />  
          </Col>  
        </FormGroup>  
      </Col>  
      <Col>  
        <FormGroup row>  
          <Col sm={5}>  
          </Col>  
          <Col sm={1}>  
          <button type="button" onClick={this.Submit} className="btn btn-success">Submit</button>  
          </Col>  
          <Col sm={1}>  
            <Button color="danger">Cancel</Button>{' '}  
          </Col>  
          <Col sm={5}>  
          </Col>  
        </FormGroup>  
      </Col>  
    </Form>  
  </Container>);

  }
  else {
    return <div><h1>Your current status {this.state.Status}</h1></div>;
  }

}  

}  

export default ClaimStatus;  
