import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';

import axios from 'axios';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const validateMessages = {
  required: 'This field is required!',
  types: {
    number: 'Not a validate number!',
  },
};


class CustomForm extends React.Component {

    componentDidMount = () => {
      console.log(this.props);
    }

    handleFormSubmit = (event, requestType, jobpostID) => {
        const title = event.target.elements.title.value;
        const description = event.target.elements.description.value;
        const img = event.target.elements.img.value;
        const expiry_date = event.target.elements.expiry_date.value;

        switch(requestType){
            case 'post':
               return axios.post('http://127.0.0.1:8000/jobpost/', {
                    title: title,
                    description: description,
                    img:img
                })
                .then(res => console.log(res))
                .catch(error => console.error(error));

            case 'put':
                return axios.put('http://127.0.0.1:8000/jobpost/' + jobpostID + '/', {
                    title: title,
                    description: description,
                    img:img
                })
                .then(res => console.log(res))
                .catch(error => console.error(error))
                .finally(f => window.location.reload());
                
        }
    }

    render(){
        return (
            <Form onSubmitCapture={(event) => this.handleFormSubmit(
                event,
                this.props.requestType,
                this.props.jobpostID
                )} {...layout} name="nest-messages" validateMessages={validateMessages}>
              <Form.Item
                label="Title"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input name="title" placeholder={
                  this.props.requestType == 'put' ?
                    this.props.jobpost.title
                  :
                    "Enter a title"
                  }/>
              </Form.Item>
        
              <Form.Item label="Description"
              rules={[
                  {
                    required: true,
                    message:'Please enter an image url'},
              ]}>
                <Input.TextArea name="description" placeholder={
                  this.props.requestType == 'put' ?
                    this.props.jobpost.description
                  :
                    "Enter a title"
                  }/>
              </Form.Item>
              
              <Form.Item
                label="Image"
                rules={[
                  {
                    required: true,
                    message: 'Please input image url!',
                  },
                ]}
              >
                  <Input name="img"  placeholder={
                  this.props.requestType == 'put' ?
                    this.props.jobpost.img
                  :
                    "Enter a title"
                  }/>
              </Form.Item>
        
              <Form.Item label="Expires On" 
              rules={[
                  {required:true,}
              ]}>
                <DatePicker name="expiry_date" />
              </Form.Item>
             
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  {this.props.btnText}
                </Button>
              </Form.Item>
            </Form>
          );
    }
 
}

export default CustomForm;