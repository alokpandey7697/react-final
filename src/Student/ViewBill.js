import React, { Component } from 'react';  
import fetch from 'cross-fetch';


export default class ViewBill extends Component {  

  constructor(props) {  
      super(props);  
      this.state = {PolicyID:'1',MemberID:'1',PremiumDue:'',PaymentDetails:'',DueDate:'',LastPremiumPaidDate:'',data:[],res:false};  
    }  

    componentDidMount(){  
      var url = new URL('https://localhost:44355/api/Members/viewBills?')

    var params = {policyID:this.state.PolicyID,memberID:this.state.MemberID} // or:
    
    url.search = new URLSearchParams(params).toString();
    
    fetch(url)
    .then(result => result.json())
         .then(response => {  
           
           this.setState({ PremiumDue: response.premiumDue, PaymentDetails: response.paymentDetails, DueDate: response.dueDate, LastPremiumPaidDate: response.lastPremiumPaidDate,res:true });
          console.log(this.state.data);
          
      
        });  
       
    }  
    render() {  
        if(this.state.res){
          return(
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
                 <td>{this.state.MemberID}</td>
             <td>{this.state.PolicyID}</td>
             <td>{this.state.PremiumDue}</td>
             <td>{this.state.PaymentDetails}</td>
             <td>{this.state.DueDate}</td>
             <td>{this.state.LastPremiumPaidDate}</td>

              </tr>
            
            </tbody>  
          </table>  
        </div> );
        }
        else{
          return (<div>
<h1>No Policy has been subscribed.</h1></div>
       );
 }
}  
}  

