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
      res: 0
    }
  }
  clearState = () => {
    this.setState({
      claimID: '',
      policyID: '',
      status: '',
      res: 0
    })
  }
  Submit = () => {
    var url = new URL('https://localhost:44355/api/Members/getClaimStatus?')

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

      }));


  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {

    if (this.state.res == 0) {
      return (<Container className="App">
        <h4 className="PageHeading">Enter ClaimID & PolicyID </h4>
        <Form className="form">
          <Col>
            <FormGroup row>
              <Label for="claimID" sm={2}>ClaimID</Label>
              <Col sm={10}>
                <Input type="text" name="claimID" onChange={this.handleChange} value={this.state.claimID} placeholder="Enter ClaimID" />
              </Col>
            </FormGroup>
            <br></br>
            <FormGroup row>
              <Label for="policyID" sm={2}>PolicyID</Label>
              <Col sm={10}>
                <Input type="text" name="policyID" onChange={this.handleChange} value={this.state.policyID} placeholder="Enter PolicyID" />
              </Col>
            </FormGroup>
          </Col>
          <br></br>
          <Col>
            <FormGroup row>
              <Col sm={5}>
              </Col>
              <Col sm={1}>
                <button type="button" onClick={this.Submit} className="btn btn-success">Submit</button>
              </Col>
              <Col sm={1}>
                <Button color="danger" onClick={this.clearState}>Cancel</Button>
              </Col>
              <Col sm={5}>
              </Col>
            </FormGroup>
          </Col>
        </Form>
      </Container>);

    }
    else if (this.state.res == 1) {
      return <div><h1>Your current status {this.state.status}</h1></div>;
    }
    else {
      return <div><h1>Invalid Claim details!</h1></div>
    }

  }

}

export default ClaimStatus;
