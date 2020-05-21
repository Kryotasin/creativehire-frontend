import React from 'react';
import { Row, Col, Typography, Divider, Form, Input, Button, Spin } from 'antd';


import axios from '../../axiosConfig';

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


const { Title, Text } = Typography;

class NewProject extends React.Component{

    loading = false;

    state = {
      jobid: null,
      projectid: null
    }

    componentDidMount() {
    }

    handleFormSubmit = (event) => {
        event.preventDefault();

        const link_jp = event.target.elements.link_jp.value;
        const org = event.target.elements.org.value;
        const jobtitle = event.target.elements.jdtitle.value;
        const description = event.target.elements.jddescription.value;

        const projtitle = event.target.elements.projtitle.value;
        const projlink = event.target.elements.projlink.value;

        const job_poster_id = localStorage.getItem('userProfileID');
        
        this.loading = true;

        // Post the job post
          axios.post('jobpost/', {
                org: org,
                link_jp: link_jp,
                title: jobtitle,
                description: description,
                job_poster_id: job_poster_id,
                // img:img
            })
            .then(res => {
              if(res.status == '201'){
                this.setState({jobid: res.data.id});

                // Post the project
                axios.post('project/', {
                    title: projtitle,
                    url: projlink,
                    project_owner_id: job_poster_id
                })
                .then(res => {
                  if(res.status == '201'){
                    this.setState({projectid: res.data.id});

                    
                    // Post the Scan and await reply
                          axios.post('scan-results/', {
                            projectid: this.state.projectid,
                            userid: job_poster_id,
                            jobid: this.state.jobid,
                            org: org,
                            jobtitle: jobtitle,
                            project_title: projtitle
                        })
                        .then(res => {
                          if(res.status == '200'){
                            this.props.history.push('scan/' + res.data['scanid'])
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

            <Row>
              <Col span={3} />
              <Col span={14}>
                <Title level={2}>New Scan</Title>
              </Col>
              <Col span={7} />
            </Row>
            <Divider>Project Details</Divider>
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


              <Divider>Job Details</Divider>

              <Form.Item
                label="Company Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input name="org" placeholder={
                    "Enter the company/organization name"
                  }/>
              </Form.Item>

              <Form.Item
                label="Link to job post"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input name="link_jp" placeholder={
                    "Paste the link ot the job post"
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
                <Button type="primary" htmlType="submit" size="large" loading={this.loading}>
                  Scan Now
                </Button>
              </Form.Item>
            </Form>

            </Spin>
            </div>
        )
    }
}

export default NewProject;