import React from 'react';
import Scan from '../components/Scan';


import axios from '../axiosConfig';


class ScanList extends React.Component{

    state = {
        scans: []
    }

    fetchMyScans = () => {

    }

    componentDidMount() {
        axios.post('my-scans/', {
                uid: localStorage.getItem('userProfileID')
        })
        .then(res => {
            this.setState({scans: res.data})
        })
    }

    render(){
        console.log(this.state.scans)
        return (
            <div>
                 <Scan data={this.state.scans} />
                <br />
            </div>
            
        )
    }
}

export default ScanList;