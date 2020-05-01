import React from 'react';
import axios from 'axios';
import CustomForm from '../components/Form';

import { Button, Card, Row, Col } from 'antd';

class ScanDetail extends React.Component{

    state = {
        match: {},
        structure: {}
    }

    componentDidMount() {
        const matchID = this.props.match.params.matchID;
        axios.get('http://127.0.0.1:8000/scans/' + matchID + '/')
            .then(res => {
                if(res.status == 200){
                    this.setState({
                        match: res.data
                    });
                    
                    axios.get('http://127.0.0.1:8000/metrics-structure/')
                    .then(res => {
                        if(res.status == 200){
                            this.setState({structure: res.data});
                        }
                    })
                }
            })
            .catch(err => {
                // err.response.status == '404' ? 
                //     this.props.history.push('/')
                // :
                //     console.log('loading')
            })
    }

    handleDelete = (event) => {
        const matchID = this.props.match.params.matchID;
        axios.delete('http://127.0.0.1:8000/scans/' + matchID + '/');
    }

    render(){
        return (
           <div>
                {
                this.props.match.params.matchID !== null ? 
                
                    <div>
                        <h1>Match Details</h1>
                        <Row>
                            <Col span={12}>
                                { this.state.structure ?
                                    this.state.structure[0]
                                        :
                                ''
                                }
                            </Col>
                            <Col span={12}>col-12</Col>
                        </Row>
                    </div>

                :
                    
                    <span>No data found</span>
                }
           </div>
        )
    }
}

export default ScanDetail;