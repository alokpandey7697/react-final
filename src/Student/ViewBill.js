import React, { Component } from 'react';
import fetch from 'cross-fetch';
import { trackPromise } from 'react-promise-tracker';
import { Container, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class ViewBill extends Component {

  constructor(props) {
    super(props);
    this.state = { premiumDue: '', policyID: '', memberID: '', paymentDetails: '', dueDate: '', lastPremiumPaidDate: '', memberIDInvalid: '', policyIDInvalid: '', res: 0 };
  }

  clearState = () => {
    this.setState({ premiumDue: '', policyID: '', memberID: '', paymentDetails: '', dueDate: '', lastPremiumPaidDate: '', memberIDInvalid: '', policyIDInvalid: '', res: 0 });
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ [e.target.name + "Invalid"]: '' });
  }
  handleSubmit = () => {

    if (this.state.memberID == "") {
      this.setState({ memberIDInvalid: "Please enter MemberID." });
      return;
    }

    else if (this.state.policyID == "") {
      this.setState({ policyIDInvalid: "Please enter PolicyID." });
      return;
    }


    var url = new URL('https://membermicroservice.azurewebsites.net/api/Members/viewBills?')

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


        })
        .catch((error) => {
        }))
  }
  render() {
    if (this.state.res == 0) {
      return (
        <div class="d-flex justify-content-center mt-5 ">
          <div class="card w-50">
            <div class="card-header bg-primary text-white text-center">
              <h3  >View Bill</h3>
            </div>
            <div class="card-body">
              <Form className="form">
                <Col>
                  <FormGroup row>
                    <Label for="memberID" sm={4}>MemberID</Label>
                    <Col sm={8}>
                      <Input type="number" name="memberID" onChange={this.handleChange} value={this.state.memberID} placeholder="Enter MemberID" />
                      <span style={{ color: "red" }}>{this.state.memberIDInvalid}</span>

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
                <Col>
                  <br></br>
                  <FormGroup row>
                    <Col sm={3}>
                    </Col>
                    <Col sm={3} >
                      <button type="button" onClick={this.handleSubmit} className="btn btn-success">Submit</button>
                    </Col>
                    <Col sm={3} >
                      <Button color="danger " onClick={this.clearState}>Cancel</Button>
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
    else if (this.state.res == 1) {
      return (
        <div class="  mt-5 pt-5 table-responsive" >
          <table class="table   " >
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

      return (<div class="d-flex justify-content-center  m-5 p-5">
        <h1 >No Policy has been subscribed.</h1></div>
      );
    }
  }
}

