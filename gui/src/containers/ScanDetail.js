import React from 'react';
import axios from 'axios';
import { Space } from 'antd';

import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

class ScanDetail extends React.Component{

    cat = null;

    subcat = null;

    label = null;

    state = {
        match: {},
        structure: null,
        processed: null
    }

    componentDidMount() {
        const matchID = this.props.match.params.matchID;
        axios.get('http://127.0.0.1:8000/scans/' + matchID + '/')
            .then(res => {
                if(res.status == 200){
                    this.setState({
                        match: res.data
                    });
                    
                    axios.get('http://127.0.0.1:8000/metrics-structure/')
                    .then(res => {
                        if(res.status == 200){
                            this.setState({structure: res.data});
                        }
                    })
                }
            })
            .catch(err => {
                // err.response.status == '404' ? 
                //     this.props.history.push('/')
                // :
                //     console.log('loading')
            })
    }

    handleDelete = (event) => {
        const matchID = this.props.match.params.matchID;
        axios.delete('http://127.0.0.1:8000/scans/' + matchID + '/');
    }
//
    existsInProject = (row) => {
        for(var i=0;i<this.state.match['project_results'].length;i++){
            if(this.state.match['project_results'][i][0] == row){
                return <CheckCircleTwoTone twoToneColor="#52c41a" />
            }
        }

        return <CloseCircleTwoTone twoToneColor="#FF0000" />
    }


    render(){

        if(this.state.structure){
            this.cat = this.state.structure[0][this.state.match['jobpost_results'][0].split(',')[0]]
            this.subcat = this.state.match['jobpost_results'][0].split(',')[1];
            this.label = this.state.match['jobpost_results'][0].split(',')[0];
        } 
            
        

        return (
           <div>
                {
                this.props.match.params.matchID !== null ? 
                
                    <Space size='10' direction='vertical'>
                        { this.state.structure ?
                        <ul style={{ listStyleType: "none" }}>
                            <h1>{this.state.structure[0][this.label]}</h1>
                            <h3>{this.state.structure[1][this.subcat]}</h3>
                            <li>{this.state.structure[3][this.label]}{this.existsInProject(this.label)}</li>


                                {
                                this.state.match['jobpost_results'].map((item, key) => {
                                    var parts = item.split(',');
                                    
                                    if(this.subcat === parts[1]){
                                        if(this.label != parts [0]){
                                            this.label = parts[0];
                                            return(
                                                <React.Fragment key={key}>
                                                    <li>{this.state.structure[3][parts[0]]}{this.existsInProject(this.label)}</li>
                                                </React.Fragment>
                                                )
                                        }
                                        else{

                                        }


                                    }
                                    else{
                                        this.subcat = parts[1];
                                        this.label = parts[0];
                                    return(
                                        <React.Fragment key={key}>
                                            <h1>{
                                                this.cat === this.state.structure[0][this.label] ?
                                                ''
                                                :
                                                this.cat = this.state.structure[0][this.label]
                                                }</h1>
                                            <h3>{this.state.structure[1][parts[1]]}</h3>
                                            <li>{this.state.structure[3][parts[0]]}
                                    {this.existsInProject(this.label)}</li>
                                        </React.Fragment>
                                    )                                    

                                }
                                }) 
                                
                                }
                        </ul>
                                :
                        ''
                        }
                    </Space>

                :
                    
                    <span>No data found</span>
                }
           </div>
        )
    }
}

export default ScanDetail;