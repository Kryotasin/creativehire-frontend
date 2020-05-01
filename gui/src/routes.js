import React from 'react'
import {Route} from 'react-router-dom';


import JobpostList from './containers/JobpostListView';
import JobpostDetail from './containers/JobpostDetailView';
import JobpostCreate from './containers/JobpostCreate';
import Login from './containers/Login';
import Signup from './containers/Signup';
import LandingPage from './containers/LadingPage';
import UserProfile from './containers/Profile';
import Comparison from './containers/Comparison';
import LoginHome from './containers/LoginHome';
import ScanList from './containers/ScanList';
import ScanDetail from './containers/ScanDetail';

const BaseRouter = () => (
    <div>
        <Route exact path ='/' component ={LoginHome} />
        <Route exact path ='/new-scan/' component ={Comparison} />
        <Route exact path ='/my-scans/' component ={ScanList} />
        <Route exact path ='/scan/:matchID' component ={ScanDetail} />

        <Route exact path ='/jobs' component ={JobpostList} />
        <Route exact path ='/jobpost/:jobpostID' component ={JobpostDetail} />
        <Route exact path ='/create/' component ={JobpostCreate} />

        <Route exact path ='/login/' component ={Login} />
        <Route exact path ='/signup/' component ={Signup} />
{/* 
        <Route exact path ='/home/' component ={LandingPage} /> */}
        <Route exact path ='/profile/' component ={UserProfile} />
    </div>
);

export default BaseRouter;