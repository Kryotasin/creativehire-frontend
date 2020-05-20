import React from 'react';
import Project from '../components/Project';


import axios from '../axiosConfig';


class Portfolio extends React.Component{

    state = {
        projects: []
    }

    componentDidMount() {
        axios.post('portfolio/', {
            'project_owner_id': localStorage.getItem('userProfileID')
        })
            .then(res => {
                console.log(res)
                this.setState({
                    projects: res.data
                });
                //console.log(res.data);
            })
    }

    render(){
        return (
            <div>
                 <Project data={this.state.projects} />
                <br />
            </div>
            
        )
    }
}

export default Portfolio;