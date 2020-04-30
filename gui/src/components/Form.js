import React from 'react';
import { Form, Input, Button, DatePicker, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';


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


const type = () => {
  return {"type" : "jd"}
}

const jobdescriptionImageProps = {
  name: 'file',
  multiple: false,
  method: 'post',
  data: type,
  action: 'http://127.0.0.1:8000/file-handler/',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class CustomForm extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        err: null
      }
    }

    componentDidMount = () => {
      // console.log(this.props);
    }

    handleFormSubmit = (event, requestType, jobpostID) => {
        event.preventDefault();
        const title = event.target.elements.title.value;
        const description = event.target.elements.description.value;
        const img_salt = event.target.elements.file;
        // const expiry_date = event.target.elements.expiry_date.value;
        const job_poster_id = localStorage.getItem('userProfileID');
        
        // console.log(event.target.elements)
        // console.log(img_salt)

        switch(requestType){
            case 'post':
               return axios.post('http://127.0.0.1:8000/jobpost/', {
                    title: title,
                    description: description,
                    job_poster_id: job_poster_id,
                    // img:img
                })
                .then(res => {
                  console.log(res);
                  if(res.status == '201'){
                    this.props.history.push('/jobpost/' + res.data.id + '/');
                  }
                })
                .catch(error => this.setState({err: error}));

            case 'put':
                return axios.put('http://127.0.0.1:8000/jobpost/' + jobpostID + '/', {
                    title: title,
                    description: description,
                    job_poster_id: job_poster_id,
                    // img:img
                })
                .then(res => console.log(res))
                .catch(error => console.error(error))
                // .finally(f => window.location.reload());
                
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
                    "Enter a Description"
                  }/>
              </Form.Item>

                {/* <Form.Item name='image' label="Image" >
                    <Form.Item name="jdimage">
                      <Upload.Dragger {...jobdescriptionImageProps}>
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag image to this area to upload</p>
                        <p className="ant-upload-hint">Support for .png files only. 150x150 preferred.</p>
                      </Upload.Dragger>
                    </Form.Item>
                  </Form.Item>
              
              <Form.Item label="Expires On" 
              rules={[
                  {required:true,}
              ]}>
                <DatePicker name="expiry_date" />
              </Form.Item> */}

              <Form.Item
                hidden={this.state.err == null ? true : false}
              >
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