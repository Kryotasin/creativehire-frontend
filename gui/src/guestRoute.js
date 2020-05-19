import React from 'react'
import {Route} from 'react-router-dom';


import LandingPage from './containers/LadingPage';
import Login from './containers/Login';
import Signup from './containers/Signup';
import ResetPassword from './containers/ResetPassword';


const GuestRouter = () => (
    <div>
        <Route exact path ='/' component ={Login} />
        <Route exact path ='/login/' component ={Login} />
        <Route exact path ='/signup/' component ={Signup} />
        <Route exact path ='/forgot-password/' component ={ResetPassword} />

        
        <Route exact path ='/scan/:scanID' component ={Login} />
        <Route exact path ='/scan/' component ={Login} />
        <Route exact path ='/confirm-email/' component ={Login} />
        
        <Route path ='*' component ={Login} />
    </div>
);

export default GuestRouter;