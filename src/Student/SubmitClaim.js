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
      isLoading: false,
      res: false,
      memberIDInvalid: '',
      policyIDInvalid: '',
      benefitIDInvalid: '',
      hospitalIDInvalid: '',
      claimAmtInvalid: '',
      benefitNameInvalid: ''
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
      isLoading: false,
      res: false,
      memberIDInvalid: '',
      policyIDInvalid: '',
      benefitIDInvalid: '',
      hospitalIDInvalid: '',
      claimAmtInvalid: '',
      benefitNameInvalid: ''
    });
  }

  SubmitClaim = () => {

    if (this.state.memberID == "") {
      this.setState({ memberIDInvalid: "Please enter MemberID." });
      return;
    }
    else if (this.state.policyID == "") {
      this.setState({ policyIDInvalid: "Please enter PolicyID." });
      return;
    }
    else if (this.state.benefitID == "") {
      this.setState({ benefitIDInvalid: "Please enter BenefitID." });
      return;
    }
    else if (this.state.hospitalID == "") {
      this.setState({ hospitalIDInvalid: "Please enter HospitalID." });
      return;
    }
    else if (this.state.claimAmt == "") {
      this.setState({ claimAmtInvalid: "Please enter ClaimAmt." });
      return;
    }
    else if (this.state.benefitName == "") {
      this.setState({ benefitNameInvalid: "Please enter BenefitName." });
      return;
    }



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
        .then(res => {
          if (res.ok) {
            this.setState({ res: true });
            return res.text();
          }
          else {
            alert("Invalid claim details provided!")
          }
        })
        .then(data => {
          this.setState({ status: data });
          this.setState({ formFilled: true });
        })
        .catch((error) => {
        })
    );
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ [e.target.name + "Invalid"]: '' });

  }

  render() {
    if (!this.state.formFilled || !this.state.res) {
      return (
        <div class="d-flex justify-content-center mt-2 ">
          <div class="card w-50">
            <div class="card-header bg-primary text-white text-center">
              <h3  >Enter Claim Information</h3>
            </div>
            <div class="card-body">


              <Form className="form">
                <Col>
                  <FormGroup row>
                    <Label for="memberID" sm={3}>MemberID</Label>
                    <Col sm={8}>
                      <Input type="text" name="memberID" onChange={this.handleChange} value={this.state.memberID} placeholder="Enter MemberID" />
                      <span style={{ color: "red" }}>{this.state.memberIDInvalid}</span>
                    </Col>
                  </FormGroup>   <br></br>
                  <FormGroup row>

                    <Label for="policyID" sm={3}>PolicyID</Label>
                    <Col sm={8}>
                      <Input type="text" name="policyID" onChange={this.handleChange} value={this.state.policyID} placeholder="Enter PolicyID" />
                      <span style={{ color: "red" }}>{this.state.policyIDInvalid}</span>
                    </Col>
                  </FormGroup>  <br></br>
                  <FormGroup row>

                    <Label for="benefitID" sm={3}>BenefitID</Label>
                    <Col sm={8}>
                      <Input type="text" name="benefitID" onChange={this.handleChange} value={this.state.benefitID} placeholder="Enter BenefitID" />
                      <span style={{ color: "red" }}>{this.state.benefitIDInvalid}</span>
                    </Col>
                  </FormGroup> <br></br>
                  <FormGroup row>

                    <Label for="hospitalID" sm={3}>HospitalID</Label>
                    <Col sm={8}>
                      <Input type="text" name="hospitalID" onChange={this.handleChange} value={this.state.hospitalID} placeholder="Enter HospitalID" />
                      <span style={{ color: "red" }}>{this.state.hospitalIDInvalid}</span>
                    </Col>
                  </FormGroup> <br></br>
                  <FormGroup row>

                    <Label for="claimAmt" sm={3}>ClaimAmt</Label>
                    <Col sm={8}>
                      <Input type="text" name="claimAmt" onChange={this.handleChange} value={this.state.claimAmt} placeholder="Enter ClaimAmt" />
                      <span style={{ color: "red" }}>{this.state.claimAmtInvalid}</span>
                    </Col>
                  </FormGroup>   <br></br>
                  <FormGroup row>


                    <Label for="benefitName" sm={3}>BenefitName</Label>
                    <Col sm={8}>
                      <Input type="text" name="benefitName" onChange={this.handleChange} value={this.state.benefitName} placeholder="Enter BenefitName" />
                      <span style={{ color: "red" }}>{this.state.benefitNameInvalid}</span>
                    </Col>
                  </FormGroup>
                </Col>
                <br></br>
                <Col>
                  <FormGroup row>

                    <Col sm={3}>
                    </Col>
                    <Col sm={3}>
                      <button type="button" onClick={this.SubmitClaim} className="btn btn-success">Submit</button>
                    </Col>
                    <Col sm={3}>
                      <Button color="danger" onClick={this.clearState}>Cancel</Button>
                    </Col>
                    <Col sm={3}>
                    </Col>
                  </FormGroup>
                </Col>
              </Form>

            </div>
          </div>
        </div >

      );
    }
    else {
      return (<div class="d-flex justify-content-center  m-5 p-5" ><h1>Your current status {this.state.status}</h1></div>);
    }
  }
}

export default SubmitClaim;
