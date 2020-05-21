import React from 'react';
import Jobposts from '../../components/Jobpost';


import axios from '../../axiosConfig';


class JobpostList extends React.Component{

    state = {
        jobposts: []
    }

    componentDidMount() {
        axios.get('jobpost/')
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