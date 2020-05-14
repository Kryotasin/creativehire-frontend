import React from 'react';
import { Form, Input, Button, Spin } from 'antd';


import axios from '../axiosConfig';

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
        projectid: null,
        jobtitle: null
    }

    loading = false;

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

        this.loading = true;


              axios.post('jobpost/', {
                    title: title,
                    description: description,
                    job_poster_id: job_poster_id,
                    // img:img
                })
                .then(res => {
                  // console.log(res);
                  if(res.status === '201'){
                    this.setState({jobid: res.data.id});

                    axios.post('project/', {
                        title: projtitle,
                        url: projlink,
                        project_owner_id: job_poster_id
                    })
                    .then(res => {
                      this.setState({jobtitle: title});
                      // console.log(res);
                      if(res.status === '201'){
                        this.setState({projectid: res.data.id});
    
                              axios.post('scan-results/', {
                                userid: job_poster_id,
                                jobid: this.state.jobid,
                                projectid: this.state.projectid,
                                jobtitle: this.state.jobtitle
                            })
                            .then(res => {
                              // console.log(res);
                              if(res.status === '200'){
                                // this.props.history.push('/my-scans/' + res.data.id + '/');
                                // this.setState({projectid: res.data.id});
                                this.props.history.push('scan/' + res.data['scanid'])
                                // console.log(res);
                                // axios.post
                            }
                            })
                            .catch(error => this.setState({err: error}));

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
            <Spin tip="Loading..." spinning={this.loading}>

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
                <Button type="primary" htmlType="submit" loading={this.loading}>
                  Scan Now
                </Button>
              </Form.Item>
            </Form>

            </Spin>
            </div>
        )
    }
}

export default Comparison;