import React from 'react';
import axios from 'axios';
import CustomForm from '../components/Form';

import { Button, Card } from 'antd';

class JobpostDetail extends React.Component{

    state = {
        jobpost: {}
    }

    componentDidMount() {
        const jobpostID = this.props.match.params.jobpostID;
        axios.get('http://127.0.0.1:8000/jobpost/' + jobpostID)
            .then(res => {
                this.setState({
                    jobpost: res.data
                });
                //console.log(res.data);
            })
    }

    handleDelete = (event) => {
        const jobpostID = this.props.match.params.jobpostID;
        axios.delete('http://127.0.0.1:8000/jobpost/' + jobpostID);
    }

    render(){
        return (
           <div>
                <Card title={this.state.jobpost.title}>
                    <p>{this.state.jobpost.description}</p>
                </Card>
                {
                this.props.match.params.jobpostID !== null ? 
                
                <div>
                    <CustomForm {...this.state}
                    requestType="put" 
                    jobpostID={this.props.match.params.jobpostID} 
                    btnText="Update" />
                    <form onSubmitCapture={this.handleDelete}>
                        <Button type="danger" htmlType="submit">Delete</Button>
                    </form>
                </div>

                :

                    <span>No data fdound</span>
                }
           </div>
        )
    }
}

export default JobpostDetail;