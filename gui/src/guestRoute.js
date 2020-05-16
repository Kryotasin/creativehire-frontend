import React from 'react'
import {Route} from 'react-router-dom';


import LandingPage from './containers/LadingPage';
import Login from './containers/Login';
import Signup from './containers/Signup';

const GuestRouter = () => (
    <div>
        <Route exact path ='/' component ={LandingPage} />
        <Route exact path ='/login/' component ={Login} />
        <Route exact path ='/signup/' component ={Signup} />
        
        <Route exact path ='/scan/:scanID' component ={LandingPage} />
        <Route exact path ='/scan/' component ={LandingPage} />
        <Route exact path ='/confirm-email/' component ={Login} />
    </div>
);

export default GuestRouter;