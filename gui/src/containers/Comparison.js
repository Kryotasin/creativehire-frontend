import React from 'react';
import CustomForm from '../components/Form';
import { Form, Input, Button, DatePicker, Upload, message } from 'antd';


import axios from 'axios';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const validateMessages = {
  required: 'This field is required!',
  types: {
    number: 'Not a validate number!',
  },
};

class Comparison extends React.Component{

    state = {
        jobid: null,
        projectid: null
    }

    componentDidMount() {
    }

    handleFormSubmit = (event) => {
        event.preventDefault();

        const title = event.target.elements.jdtitle.value;
        const description = event.target.elements.jddescription.value;
        const projtitle = event.target.elements.projtitle.value;
        const projlink = event.target.elements.projlink.value;

        const job_poster_id = localStorage.getItem('userProfileID');
        
        // console.log(title, description, projlink, projtitle, job_poster_id);

              axios.post('http://127.0.0.1:8000/jobpost/', {
                    title: title,
                    description: description,
                    job_poster_id: job_poster_id,
                    // img:img
                })
                .then(res => {
                  console.log(res);
                  if(res.status == '201'){
                    // this.props.history.push('/my-scans/' + res.data.id + '/');
                    this.setState({jobid: res.data.id});

                    axios.post('http://127.0.0.1:8000/project/', {
                        title: projtitle,
                        url: projlink,
                    })
                    .then(res => {
                      console.log(res);
                      if(res.status == '201'){
                        // this.props.history.push('/my-scans/' + res.data.id + '/');
                        this.setState({projectid: res.data.id});
    
                        // axios.post
                    }
                    })
                    .catch(error => this.setState({err: error}));
                }
                })
                .catch(error => this.setState({err: error}));

                

    }

    render(){
        return (
            <div>
            <br />
            <h2>New Scan</h2>
            <Form onSubmitCapture={(event) => this.handleFormSubmit(
                event
                )} {...layout} name="nest-messages" validateMessages={validateMessages}>
              
              <Form.Item
                label="Project Title"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input name="projtitle" placeholder={
                    "Enter a title"
                  }/>
              </Form.Item>

              <Form.Item
                label="Project Link"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input name="projlink" placeholder={
                    "Paste exact link to project"
                  }/>
              </Form.Item>


              <Form.Item
                label="Job Title"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input name="jdtitle" placeholder={
                    "Enter the position/job title"
                  }/>
              </Form.Item>
        
              <Form.Item label="Description"
              rules={[
                  {
                    required: true,
                    message:'Please paste job decription'},
              ]}>
                <Input.TextArea name="jddescription" placeholder={
                    "Enter a Description"
                  }/>
              </Form.Item>

              <Form.Item
                hidden={this.state.err == null ? true : false}
              >
              </Form.Item>
             
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Scan Now
                </Button>
              </Form.Item>
            </Form>

            </div>
        )
    }
}

export default Comparison;