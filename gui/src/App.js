import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {HashRouter as Router} from 'react-router-dom';
import {connect} from 'react-redux';
import BaseRouter from './routes';
import * as actions from './store/actions/auth'

import './App.css';

import CustomLayout from './containers/Misc/Layout';
import GuestRouter from './guestRoute';
import ErrorBoundary from './components/ErrorBoundary'

import preview from './assets/preview.png';
import {Helmet} from "react-helmet";

class App extends Component {

  componentDidMount() {
    document.title="CreativeHire";
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div className="">
  
      <Helmet>
        <meta charSet="utf-8" />
        <title>Creativehire</title>
        <meta name="description" content="Creativehire website" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={preview} /> 
        <meta property="og:url" content="https://www.creativehire.co/" />
        <meta property="og:title" content="Creativhire Home" />
        <meta property="og:description" content="Creativhire - Evaluate the strength of your portfolio" />
      </Helmet>
          {
            localStorage.getItem('token') !== null ?
            <Router basename="/">
            <CustomLayout {...this.props}>
              <ErrorBoundary>
                <BaseRouter />
              </ErrorBoundary>
              </CustomLayout>
            </Router>
            :
            <Router basename="/">
            <CustomLayout {...this.props}>
                <GuestRouter />
              </CustomLayout>
            </Router>
          }


        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: localStorage.getItem('token') !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
