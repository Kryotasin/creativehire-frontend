import React from 'react';
import { Button} from 'antd';
import { Link } from 'react-router-dom';


class LoginHome extends React.Component{

    state = {
    }

    componentDidMount() {
    }

    render(){
        return (
            <div>
                <h1 style={{color: "red"}}>Hello Style!</h1>
                <p>Add a little style!</p>  
                <Button type="primary"><Link to="/new-scan/">Scan Now</Link></Button>          
            </div>
        )
    }
}

export default LoginHome;