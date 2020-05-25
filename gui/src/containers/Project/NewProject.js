import React from 'react';
import { message , Steps, Row, Col, Typography, Divider, Form, Input, Button, Spin } from 'antd';
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

const { Step } = Steps;
const { Title, Text } = Typography;

class NewProject extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      stepStatus: null,
      stepCurrent: 0,
      step:null,
      projectlink: null,
      projectimages: null,
      projectskills: null
    }
  }

  form1 = (
    <Form onFinish={this.onFinishStep1} {...layout} name="nest-messages">
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

    <Form.Item>
      <Button type="primary" onClick={() => this.next()}>
        Next
      </Button>    
    </Form.Item>
  </Form>
  );
  

  onFinishStep1 = values => {
    console.log(values)
  };

  form2 = (
    <Form onFinish={this.onFinish} {...layout} name="nest-messages">
    <Form.Item
      label="Choose Image"
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

  </Form>
  );

  steps = [
    {
      title: 'Upload link',
      content: 'Project Link',
      form: this.form1,
    },
    {
      title: 'Choose image',
      content: 'Basic Details',
    },
    {
      title: 'Refine data',
      content: 'Skills & Process',
    },
  ];



  validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  next() {
    const current = this.state.stepCurrent + 1;
    this.setState({ stepCurrent :current });
  }

  prev() {
    const current = this.state.stepCurrent - 1;
    this.setState({ stepCurrent: current });
  }

    loading = false;



    componentDidMount() {
    }

    render(){


        return (
            <div>  
            <Helmet>
              <meta charSet="utf-8" />
              <title>New Project</title>
            </Helmet>
              
            <Spin tip="Loading..." spinning={this.loading}>


          <Row gutter={[16, 48]}>
            <Col span={3}/>
            <Col span={18}>
            <Steps size="small" current={this.state.stepCurrent}>
              {this.steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            </Col>
            <Col span={3}/>
          </Row>


        <Divider>{this.steps[this.state.stepCurrent].content}</Divider>

          {this.steps[this.state.stepCurrent].form}

          <Row gutter={[16, 16]}>
            <Col span={9}/>
            <Col span={11}>
              {/* {this.state.stepCurrent > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                  Previous
                </Button>
              )}
              {this.state.stepCurrent < this.steps.length - 1 && (
                <Button type="primary" onClick={() => this.next()}>
                  Next
                </Button>
              )}
              {this.state.stepCurrent === this.steps.length - 1 && (
                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                  Done
                </Button>
              )} */}
            </Col>
            <Col span={4}/>
          </Row>

            </Spin>
            </div>
        )
    }
}

export default NewProject;