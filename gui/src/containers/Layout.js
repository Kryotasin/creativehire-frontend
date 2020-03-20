import React from'react';
import * as actions from '../store/actions/auth';
import {connect} from 'react-redux';
import { Menu, Layout } from 'antd';


import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

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
                            localStorage.getItem('token') !== null ?
                            <Menu.Item style={{float: 'right'}} key="2" onClickCapture={this.props.logout}>Logout</Menu.Item>
    
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

