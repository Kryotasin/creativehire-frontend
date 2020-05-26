import React from 'react';
import { Carousel, Alert, message , Steps, Row, Col, Typography, Divider, Form, Input, Button } from 'antd';
import {Helmet} from "react-helmet";
import Image from 'react-bootstrap/Image'

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
      projectlink: null,
      projectimages: null,
      projectskills: null,
      projectimagepointer: 0
    }
  }

  img = "http://simonpan.com/wp-content/themes/sp_portfolio/assets/sp-logo.png";

  test = "asd";

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

  form1 = (
    <Form {...layout} name="form1"
      onFinish={(values) => {
        
        this.loading = true;

        this.setState({
          projectlink:values.projlink
        });

        axios.post('get-all-images/', {
          url: values.projlink
        })
        .then(res => {
          if(res.status == 200){
            this.setState({
              projectimages: res.data
            });
          }
          this.next();
        })
        .catch(err => {
          this.setState({
            stepStatus: err.response.data
          });
        })

        this.loading = false;
      }}>
      <Form.Item
        label="Project Link"
        name="projlink"
        rules={[
          {
            required: true,
            message: "Please enter a link"
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={this.loading}>
          Next
        </Button>
      </Form.Item>
    </Form>
  );


  form2 = (
    <Form {...layout} name="form2"
      onFinish={(values) => {


      }}>
      <Form.Item
        label="Project Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Please enter a title"
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Image src={this.img} fluid />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={this.loading}>
          Next
        </Button>
      </Form.Item>
      {this.test}
    </Form>
  );


  steps = [
    {
      title: 'Upload link',
      content: 'Project Link',
      form: this.form1,
    },
    {
      title: 'Project Details',
      content: 'Project Details',
      form: this.form2,
    },
    {
      title: 'Refine data',
      content: 'Skills & Process',
    },
  ];


  render(){
    
    this.test = this.state.projectimages;
console.log(this.test);

    let message = "";

    if(this.state.stepStatus){
      message = (
        <Alert message="Error Text" type="error" />
      );
    }


      return (
          <div>  
          <Helmet>
            <meta charSet="utf-8" />
            <title>New Project</title>
          </Helmet>
          

        <Row gutter={[16, 48]}>
          <Col span={3}/>
          <Col span={18}>

            <Steps size="small" onChange={(current) =>{
              this.setState({ stepCurrent: current });
            }} 
            current={this.state.stepCurrent}>
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
                  {message}
            </Col>        
            <Col span={4}/>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={9}/>
            <Col span={11}>
              {/* {this.state.stepCurrent > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={(event) => this.handleClick(event, "prev")}>
                  Previous
                </Button>
              )}
              {this.state.stepCurrent < this.steps.length - 1 && (
                <Button type="primary" onClick={(event) => this.handleClick(event, "next")}>
                  Next
                </Button>
              )}
              {this.state.stepCurrent === this.steps.length - 1 && (
                <Button type="primary" onClick={(event) => message.success('Processing complete!')}>
                  Done
                </Button>
              )} */}
            </Col>
            <Col span={4}/>
          </Row>

          </div>
      )
  }
}

export default NewProject;