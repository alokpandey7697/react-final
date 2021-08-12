import React from 'react';
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';
import fetch from 'cross-fetch';
import { trackPromise } from 'react-promise-tracker';
class ClaimStatus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      claimID: '',
      policyID: '',
      status: '',
      res: 0,
      claimIDInvalid: '',
      policyIDInvalid: ''
    }
  }
  clearState = () => {
    this.setState({
      claimID: '',
      policyID: '',
      status: '',
      res: 0,
      claimIDInvalid: '',
      policyIDInvalid: ''
    })
  }
  Submit = () => {
    if (this.state.claimID == "") {
      this.setState({ claimIDInvalid: "Please enter ClaimID." });
      return;
    }
    else if (this.state.policyID == "") {
      this.setState({ policyIDInvalid: "Please enter PolicyID." })
      return;
    }

    var url = new URL('https://membermicroservice.azurewebsites.net/api/Members/getClaimStatus?')

    var params = { claimID: this.state.claimID, policyID: this.state.policyID } // or:

    url.search = new URLSearchParams(params).toString();

    trackPromise(fetch(url)
      .then(response => {
        if (response.ok) {
          this.setState({ res: 1 });
          return response.text();
        }
        else {
          this.setState({ res: 2 });
        }
      })
      .then(data => {
        this.setState({ status: data });
      })
      .catch((error) => {
      }));
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ [e.target.name + "Invalid"]: '' });

  }

  render() {

    if (this.state.res == 0) {
      return (
        <div class="d-flex justify-content-center mt-5 ">
          <div class="card w-50">
            <div class="card-header bg-primary text-white text-center">
              <h3  >View ClaimStatus</h3>
            </div>
            <div class="card-body">
              <Container className="App">

                <Form className="form">
                  <Col>
                    <FormGroup row>
                      <Label for="claimID" sm={4}>ClaimID</Label>
                      <Col sm={8}>
                        <Input type="number" name="claimID" onChange={this.handleChange} value={this.state.claimID} placeholder="Enter ClaimID" />
                        <span style={{ color: "red" }}>{this.state.claimIDInvalid}</span>
                      </Col>
                    </FormGroup>
                    <br></br>
                    <FormGroup row>
                      <Label for="policyID" sm={4}>PolicyID</Label>
                      <Col sm={8}>
                        <Input type="number" name="policyID" onChange={this.handleChange} value={this.state.policyID} placeholder="Enter PolicyID" />
                        <span style={{ color: "red" }}>{this.state.policyIDInvalid}</span>
                      </Col>
                    </FormGroup>
                  </Col>
                  <br></br>
                  <Col>
                    <FormGroup row>
                      <Col sm={3}>
                      </Col>
                      <Col sm={3}>
                        <button type="button" onClick={this.Submit} className="btn btn-success">Submit</button>
                      </Col>
                      <Col sm={3}>
                        <Button color="danger" onClick={this.clearState}>Cancel</Button>
                      </Col>
                      <Col sm={3}>
                      </Col>
                    </FormGroup>
                  </Col>
                </Form>
              </Container>
            </div>
          </div>
        </div >
      );
    }

    else if (this.state.res == 1) {
      return <div class="d-flex justify-content-center  m-5 p-5"><h1>Your current status {this.state.status}</h1></div>;
    }

    else {
      return <div class="d-flex justify-content-center  m-5 p-5"><h1>Invalid Claim details!</h1></div>
    }
  }

}

export default ClaimStatus;
