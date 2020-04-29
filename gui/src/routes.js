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

const BaseRouter = () => (
    <div>
        <Route exact path ='/' component ={LoginHome} />
        <Route exact path ='/scan/' component ={Comparison} />

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