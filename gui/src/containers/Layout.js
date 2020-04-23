import React from'react';
import * as actions from '../store/actions/auth';
import {connect} from 'react-redux';
import { Menu, Layout } from 'antd';
import { PlusOutlined,LogoutOutlined } from '@ant-design/icons';


import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class CustomLayout extends React.Component {

    componentDidMount() {
      }

    render() {
        return(
            <Layout className="layout">
                <Header>
                <div className="logo" />
    
    
    
                    <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                        {
                            localStorage.getItem('token') !== null && localStorage.getItem('error') == null?
                                <Menu.Item key="2"><Link to="/jobs">Jobs</Link></Menu.Item>
                            
                            :
                            ''
                        }
                            
                        {
                            localStorage.getItem('token') !== null && localStorage.getItem('error') == null?
                            <SubMenu style={{float: 'right'}} title={<span><Link to="/profile/"> Profile</Link></span>}>
                                <MenuItemGroup title="General">
                                    <Menu.Item key="setting:2"><span><PlusOutlined /> <Link to="/create/"> New Jobpost</Link></span></Menu.Item>
                                    <Menu.Item key="setting:3" onClickCapture={this.props.logout}><LogoutOutlined /> Logout</Menu.Item>
                                </MenuItemGroup>
                            </SubMenu>
                          
                                :
    
                                <Menu.Item style={{float: 'right'}} key="2"><Link to="/login">Login</Link></Menu.Item>
                        }
                        
                    </Menu>
    
    
                </Header>
                <Content style={{ padding: '50px' }}>
                <div className="site-layout-content">
                    {this.props.children}
                </div>
    
                </Content>
                <Footer style={{ textAlign: 'center' }}>CreativeHire 2020</Footer>
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

