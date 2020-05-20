import React, { useState, useEffect }  from 'react';
import { Alert, Modal, Form, Input, Row, Col, Avatar, Upload, Button, message, Skeleton, Space, Typography  } from 'antd';

import {Link} from 'react-router-dom';

import axios from '../axiosConfig';
import { UserOutlined } from '@ant-design/icons';



function UserProfile() {
    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[email_verified, setEmailverified] = useState(null);
    const[name, setName] = useState('');
    const[location, setLocation] = useState('');
    const[img_salt, setImgSalt] = useState('');
    const[img, setImg] = useState(null);

    const { Text } = Typography;

    const reloadUsername = (data) => {
      setUsername(data);
    }

    const reloadEmail = (data) => {
        setEmail(data);
    }

    const reloadEmailVerified = (data) => {
      setEmailverified(data);
    }

    const reloadName = (data) => {
        setName(data);
    }

    const reloadLocation = (data) => {
        setLocation(data);
    }

    const reloadImgSalt = (data) => {
        setImgSalt(data);
    }

    const reloadImg = (data) => {
        setImg(data);
    }

    const typeOfImage = (proc) => {
        return {"type" : "profile_pic", "process": proc, "fileName": img_salt}
    }
    
    const userProfilePictureUploadProps = {
        name: 'file',
        acceptedFiles: '.png',
        multiple: false,
        method: 'post',
        data: typeOfImage("upload"),
        action: 'https://api.creativehire.co/file-handler/',
        onRemove(file){
            axios.post('file-handler/', {
                "file": file.name,
                ...typeOfImage('remove')
            });
        },
        
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            // console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.` + info);
          }
          reloadProfilePicture();
        },
    };

    const getProfile = () => {
    axios.get('userprofile/' + localStorage.getItem('userProfileID'))
    .then( res => {
        // Load all profile data


        reloadUsername(res.data['username']);
        reloadEmail(res.data['email']);
        reloadName(res.data['name']);
        reloadLocation(res.data['location']);
        reloadImgSalt(res.data['img_salt']);

        setTimeout(() => message.success('Profile loaded successfully.'), 100);
        reloadProfilePicture();  

        axios.get('userprofile/email-verified/' + localStorage.getItem('userProfileID'))
        .then(res => {
          if(res.data['verified']){
            reloadEmailVerified(true);
          }
        })
        .catch(err => {
          reloadEmailVerified(false);
        })

      }
    )
    .catch(err => {
        message.error(`Your profile could not be loaded due to ` + err.message);
    })
    }



    const reloadProfilePicture = () => {
        axios.post('file-handler/', {
            ...typeOfImage('fetch')
        })
        .then(
            res => {
            if(res.status === 404){
                // Set something to show lack of profile picture.
                setTimeout(() => message.error('Profile picture not found.'), 100);
            }

            else if (res.status === 200 && res.data !== 'ErrorResponseMetadata'){
                reloadImg(res.data);
            }
            
            else if(res.status === 200 && res.data == 'ErrorResponseMetadata'){
              // Set something to show lack of profile picture.
              setTimeout(() => message.error('Profile picture not found.'), 100);
          }
        })
        .catch(err => {
          if(err.response.status === 500){
            // Set something to show lack of profile picture.
            setTimeout(() => message.error('Profile picture could not be loaded.'), 100);
        }
        })
    }

    const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
        const [form] = Form.useForm();
        return (
          <Modal
            visible={visible}
            title="Update Profile"
            okText="Update"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
              form
                .validateFields()
                .then(values => {
                  form.resetFields();
                  onCreate(values);
                })
                .catch(info => {
                  console.log('Validate Failed:', info);
                });
            }}
          >
            <Form
              form={form}
              layout="vertical"
              name="form_in_modal"
              initialValues={{
                modifier: 'public',
              }}
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    message: 'Please input your full name.',
                  },
                ]}
              >
                <Input placeholder={name}/>
              </Form.Item>

              <Form.Item
                name="emil"
                label="Email"
                rules={[
                  {
                    message: 'Please input your email.',
                    type: 'email'
                  },
                ]}
              >
                <Input placeholder={email} />
              </Form.Item>
              
              <Form.Item
                name="location"
                label="Location"
                rules={[
                  {
                    message: 'Please input your Location.',
                  },
                ]}
              >
                <Input placeholder={location}/>
              </Form.Item>
            </Form>
          </Modal>
        );
      };


        const [visible, setVisible] = useState(false);
    
      
        const onCreate = values => {            
            var newEmail = values.email == null ? email : values.email;
            var newName = values.name == null ? name : values.name;
            var newLocation = values.location == null ? location : values.location;
            
            axios.put('userprofile/update/' + localStorage.getItem('userProfileID'),{
                email: newEmail,
                name: newName,
                location: newLocation
            })
            .then(res => {
                reloadEmail(res.data['email']);
                reloadName(res.data['name']);
                reloadLocation(res.data['location']);
                reloadImgSalt(res.data['img_salt']);
                setTimeout(() => message.success('Profile updated successfully!'), 100);
            })
            .catch(err => {
                message.error(`Your profile could not be updated due to ` + err.message);
            })

            
            setVisible(false);
        }


    useEffect(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
        getProfile();
    }, []); 



    return (
            <div>  
                
                <Row gutter={[8, 48]}>
                    <Col xs={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                        { 
                            img == null?
                                <Avatar shape="square" size="large" icon={ <UserOutlined />}/>
                            :
                            <img alt={ name == null ? <Text type="danger">No name found!</Text> : name + ".png"} src={`data:image/png;base64,${img}`} />                        
                        }   
                    </Col>
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                        <h1>Your Profile</h1>
                    </Col>
                </Row>

                <Row gutter={[8, 20]}>
                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                        <Upload {...userProfilePictureUploadProps}>
                            <Button
                                size="small">
                                Change Picture
                            </Button>
                        </Upload>
                    </Col>
                    <Col xs={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                        <Space size = "large">
                            <p>Username: </p>
                            <p>{username == null ? <Text type="danger">No username found!</Text> : username}</p>
                        </Space>
                    </Col>
                </Row>

                <Row gutter={[8, 20]}>
                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                    </Col>
                    <Col xs={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                        <Space size = "large">
                            <p>Name: </p>
                            <p>{name == null ? <Text type="danger">No name found!</Text> : name}</p>
                        </Space>                
                    </Col>
                </Row>

                <Row gutter={[8, 20]}>
                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                    </Col>
                    <Col xs={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                        <Space size = "large">
                            <p>Email: </p>
                            <p>{email == null ? <Skeleton active /> : email}</p>
                        </Space>
                        <Alert message= {email_verified ? "Email verified!" : <Link to='/confirm-email'>Click here to verify email</Link>} type={email_verified ? "success" : "error"} showIcon />
  
              </Col>
                </Row>

                <Row gutter={[8, 20]}>
                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                    </Col>
                    <Col xs={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                        <Space size = "large">
                            <p>Location: </p>
                            <p>{location == null ? <Text type="danger">No location set!</Text> : location}</p>
                        </Space>                
                    </Col>
                </Row>

                <Row gutter={[8, 20]}>
                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                    </Col>

                    <Col xs={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                      <Space size = "large">
                        <Button type="primary" onClickCapture={() => setVisible(true)}>Edit</Button>
                        <Link to="/reset-password/" >Change Password</Link>
                      </Space>
                    </Col>
                    
                </Row>

                    <CollectionCreateForm
                        visible={visible}
                        onCreate={onCreate}
                        onCancel={() => {
                        setVisible(false);
                        }}
                    />
            </div>
    )
}

export default UserProfile;
