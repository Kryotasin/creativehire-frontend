import React from 'react';
import { Form, Input, Button, Checkbox, Spin, Alert } from 'antd';
import { NavLink, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../store/actions/auth';
import { LoadingOutlined } from '@ant-design/icons';


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
    span: 16,
  },
};
class NormalLoginForm extends React.Component {

    formRef = React.createRef();

    

  render() {

    const onFinish = values => {
        this.props.onAuth(values.username, values.password);

        localStorage.getItem('token') != null ? 
            this.props.history.push('/')
        :
            console.log('Login failed')
            
    };
    
    const onFinishFailed = errorInfo => {
    };

    let errorMessage = null;

    if(this.props.error){
        errorMessage = (
            // <p>{this.props.error.message}</p>
            <Alert {...tailLayout} message = 'Please check the username and password' type='error' />
        )
    }
    

    return (
        <div>
            {
  
                this.props.loading ?
  
                <Spin indicator={antIcon} />
                
                :
  
  
              <Form
              {...layout}
              name="basic"
              initialValues={{
                  remember: true,
              }}
              ref={this.formRef}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
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
                  label="Password"
                  name="password"
                  rules={[
                  {
                      required: true,
                      message: 'Please input your password!',
                  },
                  ]}
              >
                  <Input.Password />
              </Form.Item>
  
              <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
              </Form.Item>
  
              <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                  Login
                  </Button> Or
                  <NavLink style={{marginRight: '10px'}} 
                  to='/signup/'> Signup
                  </NavLink>
              </Form.Item>

              
                {errorMessage}
              </Form>
          }
      </div>
    );
  } 
  
}

//const WrappedNormalLoginForm = this.forkmRef.create()(NormalLoginForm);

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);