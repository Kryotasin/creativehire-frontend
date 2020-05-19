import React from 'react'
import {Route} from 'react-router-dom';


import JobpostList from './containers/JobpostListView';
import JobpostDetail from './containers/JobpostDetailView';
import JobpostCreate from './containers/JobpostCreate';
import Login from './containers/Login';
import Signup from './containers/Signup';
import UserProfile from './containers/Profile';
import Comparison from './containers/NewScan';
import HomePage from './containers/HomePage';
import ScanList from './containers/ScanList';
import ScanDetail from './containers/ScanDetail';
import ConfirmEmail from './containers/ConfirmEmail';
import HowItWorks    from './containers/HowItWorks';
import ResetPassword from './containers/ResetPassword';

const BaseRouter = () => (
    <div>
        <Route exact path ='/' component ={HomePage} />

        <Route exact path ='/new-scan/' component ={Comparison} />
        <Route exact path ='/my-scans/' component ={ScanList} />
        <Route exact path ='/scan/:matchID' component ={ScanDetail} />

        <Route exact path ='/jobs' component ={JobpostList} />
        <Route exact path ='/jobpost/:jobpostID' component ={JobpostDetail} />
        <Route exact path ='/create/' component ={JobpostCreate} />

        <Route exact path ='/login/' component ={Login} />
        <Route exact path ='/signup/' component ={Signup} />
        <Route exact path ='/confirm-email/' component ={ConfirmEmail} />
        <Route exact path ='/confirm-email/' component ={ConfirmEmail} />
        <Route exact path ='/reset-password/' component ={ResetPassword} />


        <Route exact path ='/profile/' component ={UserProfile} />
        <Route exact path="/how-it-works/" component={HowItWorks} />
    </div>
);

export default BaseRouter;