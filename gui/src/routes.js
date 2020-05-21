import React from 'react'
import {Route} from 'react-router-dom';


import JobpostList from './containers/Job/JobpostListView';
import JobpostDetail from './containers/Job/JobpostDetailView';
import JobpostCreate from './containers/Job/JobpostCreate';

import Login from './containers/Credentials/Login';
import Signup from './containers/Credentials/Signup';
import ConfirmEmail from './containers/Credentials/ConfirmEmail';
import ResetPassword from './containers/Credentials/ResetPassword';

import HowItWorks    from './containers/Misc/HowItWorks';
import HomePage from './containers/Misc/HomePage';

import UserProfile from './containers/Credentials/Profile';

import Comparison from './containers/Scan/NewScan';

import ScanList from './containers/Scan/ScanList';
import ScanDetail from './containers/Scan/ScanDetail';

import Portfolio from './containers/Project/Portfolio';
import NewProject from './containers/Project/NewProject';
import ProjectDetail from './containers/Project/ProjectDetail';

const BaseRouter = () => (
    <div>
        <Route exact path ='/' component ={HomePage} />

        <Route exact path ='/new-project/' component ={NewProject} />
        <Route exact path ='/portfolio/' component ={Portfolio} />
        <Route exact path ='/project/:matchID' component ={ProjectDetail} />

        <Route exact path ='/new-scan/' component ={Comparison} />
        <Route exact path ='/my-scans/' component ={ScanList} />
        <Route exact path ='/scan/:matchID' component ={ScanDetail} />

        <Route exact path ='/jobs' component ={JobpostList} />
        <Route exact path ='/jobpost/:jobpostID' component ={JobpostDetail} />
        <Route exact path ='/create/' component ={JobpostCreate} />

        <Route exact path ='/login/' component ={Login} />
        <Route exact path ='/signup/' component ={Signup} />
        <Route exact path ='/confirm-email/' component ={ConfirmEmail} />
        <Route exact path ='/reset-password/' component ={ResetPassword} />
        <Route exact path ='/reset-password/:uidb64/:token' component ={ResetPassword} />


        <Route exact path ='/profile/' component ={UserProfile} />
        <Route exact path="/how-it-works/" component={HowItWorks} />
    </div>
);

export default BaseRouter;