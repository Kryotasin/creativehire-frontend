import React from 'react'
import {Switch, Route} from 'react-router-dom';


import LandingPage from './containers/Misc/LadingPage';
import Login from './containers/Credentials/Login';
import Signup from './containers/Credentials/Signup';
import ResetPassword from './containers/Credentials/ResetPassword';

import HowItWorks from './containers/Misc/HowItWorks';



const GuestRouter = () => (
    <Switch>
        <Route exact path ='/' component ={Login} />
        <Route exact path ='/login/' component ={Login} />
        <Route exact path ='/signup/' component ={Signup} />
        <Route exact path ='/reset-password/' component ={ResetPassword} />
        <Route exact path ='/reset-password/:uidb64/:token' component ={ResetPassword} />

        <Route exact path="/how-it-works/" component={HowItWorks} />

        
        <Route path ='*' component ={Login} />
    </Switch>
);

export default GuestRouter;