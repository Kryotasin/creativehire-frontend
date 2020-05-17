import React from 'react';
import { Row, Col, Form, Input, Button, Checkbox, Spin, Alert } from 'antd';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../store/actions/auth';
import { LoadingOutlined } from '@ant-design/icons';
import "antd/dist/antd.less";

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
      color: "#000",
      padding: "10px",
      fontFamily: "Helvetica Neue",
      fontWeight: "250",
      fontSize: "3.4rem",
      marginTop: "5.2rem"
    };

    const tagline = {
      color: "#006EA7",
      padding: "10px",
      fontFamily: "Helvetica Neue",
      fontWeight: "150",
      fontSize: "1.8rem",
      marginTop: "-4.2rem",
    };

    const brand = {};

    const login = {
      color: "#006EA7",
      padding: "10px",
      fontFamily: "Helvetica Neue",
      fontWeight: "150",
      width: "",
      fontSize: "2rem",
      marginTop: "2rem",
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
        console.log(this.props.error)
        getErrorValues();
        this.errorParts.forEach(element => {
          if(element){
            errorMessage = (
              <Alert {...tailLayout} message = "Login failed!" description = {element} type='error' showIcon />
            )     
          }
      });
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
            style={{
              top: "500px",
            }}
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
              style={{
                width: "500px",
              }}
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
              style={{
                width: "500px",
              }}
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
                  width: "200px",
                }}
                htmlType="submit"
              >
                {" "}
                Login
              </Button>{" "}
            </Form.Item>
            
            <Form.Item {...tailLayout}>
              <Link style={{ marginRight: "10px" }} to="/signup/">
                Create new account
              </Link>
              

              <Link to="/forgot-password/">Forgot Password</Link>
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