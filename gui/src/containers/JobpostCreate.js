import React from 'react';
import CustomForm from '../components/Form';



class JobpostCreate extends React.Component{

    state = {
        jobposts: []
    }

    componentDidMount() {
        // axios.get('http://127.0.0.1:8000/jobpost')
        //     .then(res => {
        //         this.setState({
        //             jobposts: res.data
        //         });
        //         //console.log(res.data);
        //     })
    }

    render(){
        return (
            <div>
            <br />
            <h2>New Jobpost</h2>
            <CustomForm 
                requestType="post" 
                jobpostID={null} 
                btnText="Create"/>
            </div>
        )
    }
}

export default JobpostCreate;