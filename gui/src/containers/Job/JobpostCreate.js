import React from 'react';
import CustomForm from '../../components/Form';



class JobpostCreate extends React.Component{

    state = {
        jobposts: []
    }

    componentDidMount() {

    }

    render(){
        return (
            <div>
            <br />
            <h2>New Jobpost</h2>
            <CustomForm 
                requestType="post" 
                jobpostID={null} 
                btnText="Create"
                {...this.props}/>
            </div>
        )
    }
}

export default JobpostCreate;