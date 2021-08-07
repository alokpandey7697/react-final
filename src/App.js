import React, {useState} from 'react';  

 
import SubmitClaim from './Student/SubmitClaim';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';  
import './App.css';  
import ClaimStatus from './Student/ClaimStatus';
import ViewBill from './Student/ViewBill';
import Login from './Student/LoginPage';




function App() {  
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (  
    
    !isAuthenticated?(
    <Router>  
      <div className="container">  
        <nav className="navbar navbar-expand-lg navheader">  
          <div className="collapse navbar-collapse" >  
            <ul className="navbar-nav mr-auto">  
              <li className="nav-item">  
                <Link to={'/LoginPage'} className="nav-link">Welcome</Link>  
              </li> 
              <li className="nav-item">  
                <Link to={'/SubmitClaim'} className="nav-link">SubmitClaim</Link>  
              </li> 
              <li className="nav-item">  
                <Link to={'/ClaimStatus'} className="nav-link">ClaimStatus</Link>  
              </li> 
              <li className="nav-item">  
                <Link to={'/ViewBill'} className="nav-link">ViewBill</Link>  
              </li> 
            </ul>  
          </div>  
        </nav> <br />  
        <Switch>  
       
          <Route path='/LoginPage' component={Login} />
          <Route path='/SubmitClaim' component={SubmitClaim} />
          <Route path='/ClaimStatus' component={ClaimStatus} />
          <Route path='/ViewBill' component={ViewBill} />
        
        </Switch>  
      </div>  
    </Router>  ): <Login></Login>
  );  
}  

export default App;  