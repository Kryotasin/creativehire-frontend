import React from 'react';
import Scan from '../components/Scan';

import axios from 'axios';


class ScanList extends React.Component{

    state = {
        scans: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/scans/')
            .then(res => {
                this.setState({
                    scans: res.data
                });
                //console.log(res.data);
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