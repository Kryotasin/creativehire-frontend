import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {HashRouter as Router} from 'react-router-dom';
import {connect} from 'react-redux';
import BaseRouter from './routes';
import * as actions from './store/actions/auth'

import './App.css';

import CustomLayout from './containers/Layout';
import GuestRouter from './guestRoute';
import ErrorBoundary from './components/ErrorBoundary'

class App extends Component {

  componentDidMount() {
    document.title="CreativeHire";
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div className="">

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
