import React from 'react'
import {Switch, Route} from 'react-router-dom';


import LandingPage from './containers/LadingPage';
import Login from './containers/Login';
import Signup from './containers/Signup';
import ResetPassword from './containers/ResetPassword';
import HowItWorks    from './containers/HowItWorks';



const GuestRouter = () => (
    <Switch>
        <Route exact path ='/' component ={Login} />
        <Route exact path ='/login/' component ={Login} />
        <Route exact path ='/signup/' component ={Signup} />
        <Route exact path ='/forgot-password/' component ={ResetPassword} />

        
        <Route exact path ='/scan/:scanID' component ={Login} />
        <Route exact path ='/scan/' component ={Login} />
        <Route exact path ='/confirm-email/' component ={Login} />

        <Route exact path="/how-it-works/" component={HowItWorks} />

        
        <Route path ='*' component ={Login} />
    </Switch>
);

export default GuestRouter;