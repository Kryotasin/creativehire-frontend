import React from 'react';
import Project from '../../components/Project';


import axios from '../../axiosConfig';
import { Row, Col, Button } from 'antd';

import { Link } from 'react-router-dom';


class Portfolio extends React.Component{

    state = {
        projects: []
    }

    componentDidMount() {
        axios.post('portfolio/', {
            'project_owner_id': localStorage.getItem('userProfileID')
        })
            .then(res => {
                console.log(res.data)
                this.setState({
                    projects: res.data
                });
                console.log(res.data);
            })
    }

    render(){
        return (
            <div>

                <Row gutter={[16, 48]}>
                    <Col span={18} />
                    <Col span={4}>
                        <Button>
                            <Link to='/new-project/'>
                                Add Project
                            </Link>
                        </Button>
                    </Col>
                    <Col span={2}/>
                </Row>

                <Project data={this.state.projects} />
                 
                <br />
            </div>
            
        )
    }
}

export default Portfolio;