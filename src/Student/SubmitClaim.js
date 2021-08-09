import React from 'react';

import { Container, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import fetch from 'cross-fetch';
import { trackPromise } from 'react-promise-tracker';


class SubmitClaim extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      memberID: '',
      policyID: '',
      benefitID: '',
      hospitalID: '',
      claimAmt: '',
      benefitName: '',
      status: '',
      formFilled: false,
      isLoading: false
    }
  }

  clearState = () => {
    this.setState({
      memberID: '',
      policyID: '',
      benefitID: '',
      hospitalID: '',
      claimAmt: '',
      benefitName: '',
      status: '',
      formFilled: false,
      isLoading: false
    });
  }

  SubmitClaim = () => {
    var url = new URL('https://localhost:44355/api/Members/submitClaim?')

    var params = {
      policyID: this.state.policyID, memberID: this.state.memberID, benefitID: this.state.benefitID, hospitalID: this.state.hospitalID,
      claimAmt: this.state.claimAmt, benefit: "\"" + this.state.benefitName + "\""
    } // or:

    url.search = new URLSearchParams(params).toString();
    const requestOptions = {
      method: 'POST',
    };

    trackPromise(
      fetch(url, requestOptions)
        .then(res => res.text())
        .then(data => {
          this.setState({ status: data });
          this.setState({ formFilled: true });
        })
    );
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (!this.state.formFilled) {
      return (
        <Container className="App">
          <h4 className="PageHeading">Enter Claim Informations</h4>
          <Form className="form">
            <Col>
              <FormGroup row>
                <Label for="memberID" sm={2}>MemberID</Label>
                <Col sm={10}>
                  <Input type="text" name="memberID" onChange={this.handleChange} value={this.state.memberID} placeholder="Enter MemberID" />
                </Col>
              </FormGroup>   <br></br>
              <FormGroup row>

                <Label for="policyID" sm={2}>PolicyID</Label>
                <Col sm={10}>
                  <Input type="text" name="policyID" onChange={this.handleChange} value={this.state.policyID} placeholder="Enter PolicyID" />
                </Col>
              </FormGroup>  <br></br>
              <FormGroup row>

                <Label for="benefitID" sm={2}>BenefitID</Label>
                <Col sm={10}>
                  <Input type="text" name="benefitID" onChange={this.handleChange} value={this.state.benefitID} placeholder="Enter BenefitID" />
                </Col>
              </FormGroup> <br></br>
              <FormGroup row>

                <Label for="hospitalID" sm={2}>HospitalID</Label>
                <Col sm={10}>
                  <Input type="text" name="hospitalID" onChange={this.handleChange} value={this.state.hospitalID} placeholder="Enter HospitalID" />
                </Col>
              </FormGroup> <br></br>
              <FormGroup row>

                <Label for="claimAmt" sm={2}>ClaimAmt</Label>
                <Col sm={10}>
                  <Input type="text" name="claimAmt" onChange={this.handleChange} value={this.state.claimAmt} placeholder="Enter ClaimAmt" />
                </Col>
              </FormGroup>   <br></br>
              <FormGroup row>

                <Label for="benefitName" sm={2}>BenefitName</Label>
                <Col sm={10}>
                  <Input type="text" name="benefitName" onChange={this.handleChange} value={this.state.benefitName} placeholder="Enter BenefitName" />
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
      return (<div><h1>Your current status {this.state.status}</h1></div>);
    }
  }
}

export default SubmitClaim;
