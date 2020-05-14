import React from'react';
import * as actions from '../store/actions/auth';
import {connect} from 'react-redux';
import { Menu, Layout } from 'antd';
import { PlusCircleOutlined, FolderOpenOutlined, LoginOutlined, LogoutOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../assets/logo.svg';

import { Link } from 'react-router-dom';


const { Content, Footer, Sider } = Layout;


class CustomLayout extends React.Component {

    state = {
        collapsed: false
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
      };

    render() {
        return(

    <Layout style={{ minHeight: '100vh' }}>
          <div className="logo" />

        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} breakpoint="md">
          {
              localStorage.getItem('token') !== null && localStorage.getItem('error') == null?
              <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['10']}
              style={{ lineHeight: '64px' }}
              >                            
                  <Menu.Item key="6"><Link to="/"><img alt="Creativehire logo" src={logo} style={{width: '9rem'}}></img></Link></Menu.Item>
                  <Menu.Item key="1" icon={<PlusCircleOutlined />}><Link to="/new-scan">New Scan  </Link></Menu.Item>
                  <Menu.Item key="2" icon={<FolderOpenOutlined />}><Link to="/my-scans">My Scans </Link></Menu.Item>
                  <Menu.Item key="3" icon={<QuestionCircleOutlined />}><Link to="/how-it-works/">How it works </Link></Menu.Item>
                  <Menu.Item key="4" icon={<UserOutlined />}><Link to="/profile/">Profile </Link></Menu.Item>
                  <Menu.Item key="5" onClickCapture={this.props.logout} icon={<LogoutOutlined />}> Logout </Menu.Item>
                  </Menu>
              :
              <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['']}
              style={{ lineHeight: '64px' }}
              >
                  <Menu.Item key="2" icon={<LoginOutlined />}><Link to="/login">Login</Link></Menu.Item>
                  </Menu>
          }
        </Sider>



        <Layout className="site-layout">
          
          <Content style={{ margin: '0 16px', padding: '50px' }}>
            <div className="site-layout-content">
                {this.props.children}
            </div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>CreativeHire 2020</Footer>
        </Layout>

      </Layout>
        );
    }

    
}



const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(CustomLayout);

