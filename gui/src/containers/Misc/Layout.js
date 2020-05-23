import React from'react';
import * as actions from '../../store/actions/auth';
import {connect} from 'react-redux';
import { Space, Menu, Layout } from 'antd';
import { PlusCircleOutlined, ApartmentOutlined, FolderOpenOutlined, LoginOutlined, LogoutOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../../assets/CH.png';

import { Link } from 'react-router-dom';


const { Header, Content, Footer, Sider } = Layout;

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

          {
              localStorage.getItem('token') !== null && localStorage.getItem('error') == null?
              <Sider collapsed={this.state.collapsed} onCollapse={this.onCollapse} breakpoint="md">
              <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['-1']}
              style={{ lineHeight: '64px' }}
              >                            
                  <Menu.Item key="6"><Link to="/"><img alt="Creativehire logo" src={logo} style={{width: '9rem'}}></img></Link></Menu.Item>
                  <Menu.Item key="1" icon={<PlusCircleOutlined />}><PlusCircleOutlined /><Link to="/new-scan/">New Scan  </Link></Menu.Item>
                  <Menu.Item key="2" icon={<FolderOpenOutlined />}><FolderOpenOutlined /><Link to="/my-scans/">My Scans </Link></Menu.Item>
                  {/* <Menu.Item key="4" icon={<ApartmentOutlined />}><ApartmentOutlined /><Link to="/portfolio/">Portfolio </Link></Menu.Item> */}
                  <Menu.Item key="5" icon={<UserOutlined />}><UserOutlined /><Link to="/profile/">Profile </Link></Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="3" icon={<QuestionCircleOutlined />}><QuestionCircleOutlined /><Link to="/how-it-works/">How it works </Link></Menu.Item>
                  <Menu.Item key="7" onClickCapture={this.props.logout} icon={<LogoutOutlined />}> <LogoutOutlined /> Logout </Menu.Item>
                  </Menu>
              </Sider>
              :
              <Header>
                <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                >
                  <Menu.Item key="6"><Link to="/"><img alt="Creativehire logo" src={logo} style={{width: '9rem'}}></img></Link></Menu.Item>
                  <Menu.Item key="1" icon={<QuestionCircleOutlined />}><QuestionCircleOutlined /><Link to="/how-it-works/">How it Works</Link></Menu.Item>
                  <Menu.Item key="2" icon={<LoginOutlined />}><LoginOutlined /><Link to="/login/">Login</Link></Menu.Item>
                </Menu>
              </Header>

          }

        <Layout className="site-layout">
          
          <Content style={{ margin: '0 16px', padding: '50px' }}>
            <div className="site-layout-content">
                {this.props.children}
            </div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            <Space size="large">
            <Link to="/contact/">Contact</Link>
            Copyright CreativeHire 2020
            </Space>
          </Footer>
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

