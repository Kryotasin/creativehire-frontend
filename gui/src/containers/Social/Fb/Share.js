import React, { Component} from 'react';
import { FacebookProvider, Like } from 'react-facebook';
 
export default class FbShare extends Component {
  render() {
    return (
      <FacebookProvider appId={process.env.REACT_APP_FB_APP_ID}>
        <Like href="https://www.creativehrie.co" colorScheme="dark" showFaces share />
      </FacebookProvider>
    );
  }
}