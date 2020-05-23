import React from 'react'
import {Switch, Route} from 'react-router-dom';


import LandingPage from './containers/Misc/LadingPage';
import Contact from './containers/Misc/Contact';

import Login from './containers/Credentials/Login';
import Signup from './containers/Credentials/Signup';
import ResetPassword from './containers/Credentials/ResetPassword';

import HowItWorks from './containers/Misc/HowItWorks';
import Privacy from './containers/Misc/Privacy';
import Terms from './containers/Misc/Terms';


const GuestRouter = () => (
    <Switch>
        <Route exact path ='/' component ={Login} />
        <Route exact path ='/login/' component ={Login} />
        <Route exact path ='/signup/' component ={Signup} />
        <Route exact path ='/reset-password/' component ={ResetPassword} />
        <Route exact path ='/reset-password/:uidb64/:token' component ={ResetPassword} />

        <Route exact path="/how-it-works/" component={HowItWorks} />

        <Route exact path="/contact/" component={Contact} />
        <Route exact path="/privacy-policy/" component={Privacy} />
        <Route exact path="/terms/" component={Terms} />

        <Route path ='*' component ={Login} />
    </Switch>
);

export default GuestRouter;