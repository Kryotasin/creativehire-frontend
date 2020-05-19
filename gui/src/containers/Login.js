import React from 'react';
import { Row, 
  Col, 
  Form, 
  Input, 
  Button, 
  Checkbox, 
  Spin, 
  Alert, 
  Space } from 'antd';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../store/actions/auth';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 20,
  },
};

class NormalLoginForm extends React.Component {
    errorParts = [];

    componentDidMount(){

        if(localStorage.getItem('token')){
            this.props.history.push('/');
        }
    }

  render() {
    const header = {
      padding: "10px",
      fontSize: "3em",
      marginTop: "4.2rem",
      lineHeight: '4rem'
    };

    const tagline = {
      padding: "10px",
      fontSize: "1.6em",
      marginTop: "-3.2rem",
    };

    const brand = {};

    const login = {
      padding: "10px",
      fontSize: "2rem",
      marginTop: "3rem",
      borderLeft: "1px solid #000",
    };

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
      <Row gutter={[40, 16]}>
        <Col span={2}>
        </Col>
        <Col span={10}>
        <div style={brand}>
          <p style={header}>Welcome to Creative Hire</p>
          <p style={tagline}>
            Make Smart Decisions in your UX job applications
          </p>
        </div>
        </Col>
        <Col span={10}>
          
      <div style={login}>
        {this.props.loading ? (
          <Spin indicator={antIcon} />
        ) : 
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
                  message: "Please input your username!",
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
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>


            <Form.Item name="remember" valuePropName="checked" {...tailLayout}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

              

            <Form.Item {...tailLayout}>
              <Button
                type="primary"
                size="large"
                style={{
                  background: "#063852",
                  borderColor: "#063852",
                  width: "8em",
                }}
                htmlType="submit"
              >
                {" "}
                Login
              </Button>{" "}
            </Form.Item>
            
            <Form.Item {...tailLayout}>
            <Space size="large">
              <Link style={{ marginRight: "10px" }} to="/signup/">
                Create new account
              </Link>
              

              <Link to="/forgot-password/">Forgot Password</Link>
              </Space>
            </Form.Item>
            {errorMessage}
          </Form>
        }
      </div>
        </Col>
        <Col span={2}>
        </Col>

      </Row>
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