import React from 'react';
import Jobposts from '../components/Jobpost';
import CustomForm from '../components/Form';

import axios from 'axios';


class JobpostList extends React.Component{

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
                 <Jobposts data={this.state.jobposts} />
                <br />
            </div>
            
        )
    }
}

export default JobpostList;