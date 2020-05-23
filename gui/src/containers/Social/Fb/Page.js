import React, { Component} from 'react';
import { FacebookProvider, Page } from 'react-facebook';
 
export default class Example extends Component {
  render() {
    return (
      <FacebookProvider appId={process.env.REACT_APP_FB_APP_ID}>
        <Page href="https://www.creativehrie.co" tabs="timeline" />
      </FacebookProvider>    
    );
  }
}