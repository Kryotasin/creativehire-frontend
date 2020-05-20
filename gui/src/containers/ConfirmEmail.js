import React from 'react';
import { Form, Input, Button, Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import axios from '../axiosConfig';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
};
class ConfirmEmail extends React.Component {

    state = {
        loading: false,
        message: null,
        description: null,
        type: null
    }

    componentDidMount(){

    }

  render() {

    const onFinish = values => {
        this.setState({
            loading: true
        });
        axios.post('api/v1/rest-auth/registration/verify-email/', {
            'key': values['token']
        })
        .then(res => {
            this.setState({
                loading: false
            });
            if(res.status == '200' || res.status == '201'){
                this.setState({
                    message: 'Email verified!',
                    description: 'Your email has been verified.',
                    type: 'success'         
                });

            }
            else if(res.status != '200'){
                this.setState({
                    message: 'Email verification failed!',
                    description: 'Please check the token again If problem persists contact admin@creativehire.co.',
                    type: 'error'         
                });
            }
        })
    };
    
    const onFinishFailed = errorInfo => {
    };

    const onSubCap = event => {
        event.preventDefault();
    };
   

    return (
        <div>
            {
  
                this.state.loading ?
  
                <Spin indicator={antIcon} />
                
                :
  
  
              <Form
              {...layout}
              initialValues={{
                  remember: true,
              }}
              ref={this.formRef}
              onSubmitCapture={onSubCap}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              >
              <Form.Item
                  label="Token"
                  name="token"
                  rules={[
                  {
                      required: true,
                      message: 'Please input your token!',
                  },
                  ]}
              >
                  <Input autoComplete="off" />
              </Form.Item>
  
              <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                  Verify Email
                  </Button>
              </Form.Item>
            
            {
                this.state.message && this.state.description && this.state.type ? 
                <Alert {...tailLayout} message = {this.state.message} description = {this.state.description} type={this.state.type} showIcon />
                :
                ''
            }
              
              </Form>
          }
      </div>
    );
  } 
  
}

export default ConfirmEmail;