import React from 'react';
import Scan from '../components/Scan';

import axios from 'axios';


class ScanList extends React.Component{

    state = {
        jobposts: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/jobpost/')
            .then(res => {
                this.setState({
                    jobposts: res.data
                });
                //console.log(res.data);
            })
    }

    render(){
        return (
            <div>
                 <Scan data={this.state.jobposts} />
                <br />
            </div>
            
        )
    }
}

export default ScanList;