import React from 'react';
import {
  Form,
  Input,
  Checkbox,
  Button,
  Alert,
  Popover
} from 'antd';

import * as actions from '../store/actions/auth';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
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

  errorParts = []
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
                  }
                })
              }
            }

            if(this.props.error){
              getErrorValues();
              this.errorParts.forEach(element => {
                if(element){
                  errorMessage = (
                    <Alert {...tailLayout} message = "Registration failed!" description = {element} type='error' showIcon />
                  )     
                }
            });
            }

            return (
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
                      I have read the <a href="terms">agreement</a>
                    </Checkbox>
                  </Form.Item>
            
                  <Form.Item {...tailLayout}>

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
              </Form.Item>
                          {errorMessage}
                </Form>
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