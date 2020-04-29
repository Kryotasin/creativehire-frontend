import React from'react';
import * as actions from '../store/actions/auth';
import {connect} from 'react-redux';
import { Menu, Layout } from 'antd';
import { PlusCircleOutlined, FolderOpenOutlined, LogoutOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../assets/logo.svg';

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
    
    
                    


                        {
                            localStorage.getItem('token') !== null && localStorage.getItem('error') == null?
                            <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['10']}
                            style={{ lineHeight: '64px' }}
                            >

                                <Menu.Item key="6"><Link to="/"><img src={logo} style={{width: '9rem'}}></img></Link></Menu.Item>
                                <Menu.Item style={{float: 'right'}} key="5" onClickCapture={this.props.logout}> Logout <LogoutOutlined /></Menu.Item>
                                <Menu.Item style={{float: 'right'}} key="4"><Link to="/profile/">Profile <UserOutlined /></Link></Menu.Item>
                                <Menu.Item style={{float: 'right'}} key="3"><Link to="/how-it-works/">How it works <QuestionCircleOutlined /></Link></Menu.Item>
                                <Menu.Item style={{float: 'right'}} key="2"><Link to="/my-scans">My Scans <FolderOpenOutlined /></Link></Menu.Item>
                                <Menu.Item style={{float: 'right'}} key="1"><Link to="/scan">New Scan <PlusCircleOutlined /> </Link></Menu.Item>
                                </Menu>
                            :
                            <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['']}
                            style={{ lineHeight: '64px' }}
                            >

                                <Link to="/"><img src={logo} style={{width: '9rem'}}></img></Link>
                                <Menu.Item style={{float: 'right'}} key="2"><Link to="/login">Login</Link></Menu.Item>
                                </Menu>

                        }
                        {
                            // localStorage.getItem('token') !== null && localStorage.getItem('error') == null?
                            //     <Menu.Item key="2"><Link to="/jobs">Jobs</Link></Menu.Item>
                            
                            // :
                            // ''
                        }
                            
                        {
                            // localStorage.getItem('token') !== null && localStorage.getItem('error') == null?
                            // <SubMenu style={{float: 'right'}} title={<span><Link to="/profile/"> Profile</Link></span>}>
                            //     <MenuItemGroup title="General">
                            //         <Menu.Item key="setting:2"><span><PlusOutlined /> <Link to="/create/"> New Jobpost</Link></span></Menu.Item>
                            //         <Menu.Item key="setting:3" onClickCapture={this.props.logout}><LogoutOutlined /> Logout</Menu.Item>
                            //     </MenuItemGroup>
                            // </SubMenu>
                          
                            //     :
    
                            //     <Menu.Item style={{float: 'right'}} key="2"><Link to="/login">Login</Link></Menu.Item>
                        }
                        

    
    
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

