import React from 'react';
import Login from '../Credentials/Login'
import {Helmet} from "react-helmet";



class LandingPage extends React.Component{

    state = {
    }

    componentDidMount() {
    }

    render(){
        return (
            <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Creativehire</title>
            </Helmet>
                <Login />
            </div>
        )
    }
}

export default LandingPage;