import React from 'react';
import {
  Form,
  Input,
  Button,
  Alert,
  Spin,
} from 'antd';

import { LoadingOutlined } from '@ant-design/icons';
import axios from '../../axiosConfig';

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


class Contact extends React.Component {



    state = {
    err: false
    }

    componentDidMount(){

    }



    render(){
        let message = null;


        const onFinish = values => {
            const title = values.title;
            const email = values.email;
            const description = values.description;
            const userID = localStorage.getItem('userProfileID') ? localStorage.getItem('userProfileID') : -1;

            axios.post('misc/contact/', {
                userID: userID,
                title: title,
                email: email,
                description:description
            })
            .then(res => {
                if(res.status == 201){
                    message = (
                        <Alert {...tailLayout} message = "Done!" description = "Your query has been registerd. We'll get back to you soon." type='success' showIcon />
                    );
                }
            })
            .catch(err => {
                this.setState({err: err.response.data});
            })
        };



        return (
            <div>
            {this.props.loading ? (
            <Spin indicator={antIcon} />
            ) : 
            <Form
                {...formItemLayout}
                name="contact"
                onFinish={onFinish}
                scrollToFirstError
            >

                <Form.Item
                name="title"
                label="Title"
                rules={[
                    {
                    required: true,
                    message: 'Please input title!',
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

                <Form.Item label="Description"
                name="description" 
                rules={[
                    {
                        required: true,
                        message:'Please decribe your concern'},
                ]}>
                    <Input.TextArea placeholder={
                        "Enter a Description"
                    }/>
                </Form.Item>

        
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Send
                    </Button>
                </Form.Item>
                    {message}
            </Form>
            }
            </div>
            );
    }

};


export default Contact;