import React, { Component } from 'react';
import fetch from 'cross-fetch';
import { trackPromise } from 'react-promise-tracker';
import { Container, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class ViewBill extends Component {

  constructor(props) {
    super(props);
    this.state = { premiumDue: '', policyID: '', memberID: '', paymentDetails: '', dueDate: '', lastPremiumPaidDate: '', data: [], res: 0 };
  }

  clearState = () => {
    this.setState({ premiumDue: '', policyID: '', memberID: '', paymentDetails: '', dueDate: '', lastPremiumPaidDate: '', data: [], res: 0 });
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit = () => {
    var url = new URL('https://localhost:44355/api/Members/viewBills?')

    var params = { policyID: this.state.policyID, memberID: this.state.memberID } // or:

    url.search = new URLSearchParams(params).toString();

    trackPromise(
      fetch(url)
        .then(result => {
          if (result.ok) {
            this.setState({ res: 1 });
            return result.json()
          }
          else {
            this.setState({ res: 2 });
          }
        })
        .then(response => {

          this.setState({ premiumDue: response.premiumDue, paymentDetails: response.paymentDetails, dueDate: response.dueDate.toString().substring(0, 10), lastPremiumPaidDate: response.lastPremiumPaidDate.toString().substring(0, 10), res: true });


        }));
  }
  render() {
    if (this.state.res == 0) {
      return (
        <Container className="App">
          <Form className="form">
            <Col>
              <FormGroup row>
                <Label for="memberID" sm={2}>MemberID</Label>
                <Col sm={10}>
                  <Input type="text" name="memberID" onChange={this.handleChange} value={this.state.memberID} placeholder="Enter MemberID" />
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
            <Col>
              <br></br>
              <FormGroup row>
                <Col sm={5}>
                </Col>
                <Col sm={1} >
                  <button type="button" onClick={this.handleSubmit} className="btn btn-success">Submit</button>
                </Col>
                <Col sm={1} >
                  <Button color="danger " onClick={this.clearState}>Cancel</Button>
                </Col>
                <Col sm={5}>
                </Col>
              </FormGroup>
            </Col>
          </Form>
        </Container>
      );
    }
    else if (this.state.res == 1) {
      return (
        <div>
          <table className="table table-striped" style={{ marginTop: 10 }}>
            <thead>
              <tr>
                <th>MemberID</th>
                <th>PolicyID</th>
                <th>PremiumDue</th>
                <th>PaymentDetails</th>
                <th>DueDate</th>
                <th>LastPremiumPaidDate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.memberID}</td>
                <td>{this.state.policyID}</td>
                <td>{this.state.premiumDue}</td>
                <td>{this.state.paymentDetails}</td>
                <td>{this.state.dueDate}</td>
                <td>{this.state.lastPremiumPaidDate}</td>
              </tr>
            </tbody>
          </table>
        </div>);
    }
    else {

      return (<div>
        <h1>No Policy has been subscribed.</h1></div>
      );
    }
  }
}

