import React from 'react';
import {
  Form,
  Input,
  Checkbox,
  Button,
  Alert,
  Popover,
  Spin,
  Space
} from 'antd';

import * as actions from '../../store/actions/auth';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};

const tailLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };


class RegistrationForm extends React.Component {

  errorParts = [];
  errorPartsHead = [];

  state = {
    agreementChecked: false
  }

  componentDidMount(){

    if(localStorage.getItem('token')){
        this.props.history.push('/');
    }
  }



        render(){
            const onFinish = values => {
              this.props.onAuth(
                  values.username,
                  values.email,
                  values.password,
                  values.confirm
              );
            };

            let errorMessage = null;

            const getErrorValues = () => {
              if(this.props.error){
                Object.entries(this.props.error).map((key, value) => {
                  for(var i=0;i<=value;i++){
                    this.errorParts.push(key[1][i]);
                    this.errorPartsHead.push(key[0]);
                  }
                })
              }
            }

            if(this.props.error){
              if(this.props.error == 521){
                // Catch Netwrok down
                errorMessage = (
                  <Alert {...tailLayout} message = "Login failed!" description = "The server seems to be down! Please try again later." type='error' showIcon />
                )
              }
              else{
                getErrorValues();
                this.errorParts.forEach(element => {
                  if(element){
                    errorMessage = (
                      <Alert {...tailLayout} message = "Login failed!" description = {element} type='error' showIcon />
                    )     
                  }
              });
              }
        
              }

            return (
              <div>  
              <Helmet>
                <meta charSet="utf-8" />
                <title>Signup</title>
              </Helmet>
              {this.props.loading ? (
                <Spin indicator={antIcon} />
              ) : 
                <Form
                  {...formItemLayout}
                  name="register"
                  onFinish={onFinish}
                  scrollToFirstError
                >
                    <Form.Item
                      label="Username"
                      name="username"
                      rules={[
                      {
                          required: true,
                          message: 'Please input your username!',
                      },
                      ]}
                  >
                      <Input />
                    </Form.Item>    
                  <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
            
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>
            
                  <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
            
                          return Promise.reject('The two passwords that you entered do not match!');
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
            
                  <Form.Item name="agreement" valuePropName="checked" {...tailLayout}>
                    <Checkbox
                      defaultChecked={true}
                      onChange = {() => {
                        this.setState({
                          agreementChecked: !this.state.agreementChecked
                        });
                      }}
                    >
                      I have read the <Link to="/terms/">agreement</Link>
                    </Checkbox>
                  </Form.Item>

            
                  <Form.Item {...tailLayout}>
                    <Space size="large">
                      {!this.state.agreementChecked ? 
                        <Popover content='You need to the agree to the Terms and Conditions.'>
                          <Button type="primary" htmlType="submit" disabled = {!this.state.agreementChecked}>
                                    Signup
                          </Button>
                      </Popover>
                      :
                        <Button type="primary" htmlType="submit" disabled = {!this.state.agreementChecked}>
                          Signup
                        </Button>
                    }
                      Or
                      <NavLink style={{marginRight: '10px'}} 
                      to='/login/'> Login
                      </NavLink>
                    </Space>
              </Form.Item>
                          {errorMessage}
                </Form>
              }
              </div>
              );
        }
 
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);