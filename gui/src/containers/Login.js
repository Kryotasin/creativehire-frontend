import React from 'react';
import { Form, Input, Button, Checkbox, Spin, Alert } from 'antd';
import { NavLink } from 'react-router-dom';
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

    componentDidMount(){

        if(localStorage.getItem('token')){
            this.props.history.push('/');
        }
    }

  render() {

    const onFinish = values => {
        this.props.onAuth(values.username, values.password);
    };
    
    const onFinishFailed = errorInfo => {
    };

    const onSubCap = event => {
        event.preventDefault();
        // this.props.onAuth(event.username, event.password);
    };

    let errorMessage = null;

    if(this.props.error){
        errorMessage = (
            // <p>{this.props.error.message}</p>
            <Alert {...tailLayout} message = 'Username password combination not found.' type='error' showIcon />
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
              initialValues={{
                  remember: true,
              }}
              ref={this.formRef}
              onSubmitCapture={onSubCap}
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