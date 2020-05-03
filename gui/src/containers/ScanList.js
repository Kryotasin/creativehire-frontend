import React from 'react';
import Scan from '../components/Scan';

import axios from 'axios';


class ScanList extends React.Component{

    state = {
        scans: []
    }

    fetchMyScans = () => {

    }

    componentDidMount() {
        axios.post('http://127.0.0.1:8000/my-scans/', {
                uid: localStorage.getItem('userProfileID')
        })
        .then(res => {
            console.log(res.data);
            this.setState({scans: res.data})
        })
    }

    render(){
        return (
            <div>
                 <Scan data={this.state.scans} />
                <br />
            </div>
            
        )
    }
}

export default ScanList;