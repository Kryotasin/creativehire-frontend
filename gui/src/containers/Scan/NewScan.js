import React from 'react';
import { Alert, Row, Col, Typography, Divider, Form, Input, Button, Spin } from 'antd';
import {Helmet} from "react-helmet";


import axios from '../../axiosConfig';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};


const { Title, Text } = Typography;

class Comparison extends React.Component{

    loading = false;

    state = {
      err: null,
      jobid: null,
      projectid: null,
      work: null
    }

    componentDidMount() {
    }


    render(){
      
      let errorMessage = null;

      const handleFormSubmit = values => {

        const link_jp = values.link_jp;
        const org = values.org;
        const jobtitle = values.jdtitle;
        const description = values.jddescription;

        const projtitle = values.projtitle;
        const projlink = values.projlink;

        const job_poster_id = localStorage.getItem('userProfileID');
        
        this.loading = true;
        this.setState({
          work: "Starting upload process..."
        });

        // Do Something

        this.setState({
          work: "Uploading job details..."
        });

        // Post the job post
          axios.post('jobpost/', {
                org: org,
                link_jp: link_jp,
                title: jobtitle,
                description: description,
                job_poster_id: job_poster_id,
                // img:img
            })
            .then(jobRes => {
              if(jobRes.status == '201'){
                this.setState({jobid: jobRes.data.id});

                this.setState({
                  work: "Job details uploaded successfully. Uploading project."
                });

                // Post the project
                axios.post('project/', {
                    title: projtitle,
                    url: projlink,
                    project_owner_id: job_poster_id
                })
                .then(projectRes => {
                  if(projectRes.status == '201'){
                    this.setState({projectid: projectRes.data.id});
                    
                    this.setState({
                      work: "Project uploaded sucessfully. "
                    });

                    this.setState({
                      work: "Analyzing the project and portfolio... "
                    });
                    
                      // Post the Scan and await reply
                          axios.post('scan-results/', {
                            projectid: this.state.projectid,
                            userid: job_poster_id,
                            jobid: this.state.jobid,
                            org: org,
                            jobtitle: jobtitle,
                            project_title: projtitle
                        })
                        .then(scanRes => {
                          if(scanRes.status == '200'){
                            this.setState({
                              work: "Analysis complete. Hold tight while we take you there..."
                            });
                            
                            setTimeout(() => { this.props.history.push('/scan/' + scanRes.data['scanid']) }, 4000);
                        }
                        })
                        .catch(scanError => {
                          
                          // set text
                            this.setState({
                              work: "Failed! Deleting project and job details..."
                            });

                            
                          this.loading=false;

                          if(scanError.response.status == 500){
                            axios.delete('project/' + this.state.projectid + '/')
                            .catch(delErr1 =>{});
                            axios.delete('jobpost/' + this.state.jobid + '/')
                            .catch(delErr2 =>{});
                            this.setState({err: "The server seems to be down. Please try again later."});
                          }
                          else{
                            this.setState({err: scanError.response.statusText});
                          }

                          
                        });

                }
                })
                .catch(projectError => {
                  this.setState({
                    work: "Failed project uploadings..."
                  });
                  
                  this.loading = false;

                  if(projectError.response.data.includes("IntegrityError ")){
                    this.setState({err: "Please choose a different project title."})
                  }
                  else{
                    this.setState({err: projectError.response.data})
                  }

                });
            }
            })
            .catch(jobpostError => this.setState({err: jobpostError.response.data}));
       }

       if(this.state.err){
          errorMessage = (
            <Alert {...layout} message = "Login failed!" description = {this.state.err} type='error' showIcon />
          )
        }

        return (
            <div>  
            <Helmet>
              <meta charSet="utf-8" />
              <title>Scan Portfolio</title>
            </Helmet>
            <br />
            <Spin tip={this.state.work} spinning={this.loading}>

            <Row>
              <Col span={3} />
              <Col span={14}>
                <Title level={2}>New Scan</Title>
              </Col>
              <Col span={7} />
            </Row>
            <Divider>Project Details</Divider>
            <Form onFinish={handleFormSubmit}
                scrollToFirstError 
                {...layout} 
                name="new-scan">
              
              <Form.Item
                label="Project Title"
                name="projtitle"
                rules={[
                  {
                    required: true,
                    message: "Please input the project title",
                  },
                ]}
              >
                <Input placeholder={
                    "Enter a title"
                  }/>
              </Form.Item>

              <Form.Item
                label="Project Link"
                name="projlink"
                rules={[
                  {
                    type: 'url',
                    message: 'The input is not valid link!',
                  },
                  {
                    required: true,
                    message: 'Please paste the link to project',
                  },
                ]}
              >
                <Input placeholder={
                    "http://...."
                  }/>
              </Form.Item>


              <Divider>Job Details</Divider>

              <Form.Item
                label="Company Name"
                name="org"
                rules={[
                  {
                    required: true,
                    message: "Please input the job posting comapny name!",
                  },
                ]}
              >
                <Input placeholder={
                    "Google Inc."
                  }/>
              </Form.Item>

              <Form.Item
                label="Link to job post"
                name="link_jp"
                rules={[
                  {
                    type: 'url',
                    message: 'The input is not valid link!',
                  },
                  {
                    required: true,
                    message: 'Please paste the link to job post',
                  },
                ]}
              >
                <Input placeholder={
                    "http://...."
                  }/>
              </Form.Item>

              <Form.Item
                label="Job Title"
                name="jdtitle" 
                rules={[
                  {
                    required: true,
                    message:'Please enter the job title'
                  },
                ]}
              >
                <Input placeholder={
                    "UX/UI Designer"
                  }/>
              </Form.Item>
        
              <Form.Item label="Description"
              name="jddescription" 
              rules={[
                  {
                    required: true,
                    message:'Please paste job decription'},
              ]}>
                <Input.TextArea placeholder={
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
              
            {errorMessage}
            </Form>

            </Spin>
            </div>
        )
    }
}

export default Comparison;