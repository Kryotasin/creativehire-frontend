import React from 'react';
// import axios from 'axios';
import { Empty  } from 'antd';
import { Progress, Row, Col } from 'antd';
import axiosConfig from '../axiosConfig';

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
        axiosConfig.get('scans/' + matchID + '/')
            .then(res => {
                if(res.status === 200){
                    this.setState({
                        match: res.data
                    });
                    
                    axiosConfig.get('/metrics-structure/')
                    .then(res => {
                        if(res.status === 200){
                            this.setState({structure: res.data});
                        }
                    })
                }
            })
            .catch(err => {
                // err.response.status === '404' ? 
                //     this.props.history.push('/')
                // :
                //     console.log('loading')
            })
    }

    handleDelete = (event) => {
        const matchID = this.props.match.params.matchID;
        axiosConfig.delete('scans/' + matchID + '/');
    }

    existsInProject = (row) => {
        if(this.state.match['matchitems']){
            for(var i=0;i<this.state.match['matchitems'].length;i++){
                if(this.state.match['matchitems'][i].trim() === row.trim()){
                    return <CheckCircleTwoTone style={{ fontSize: '1.2rem', float: "right" }} twoToneColor="#52c41a" />
                }
            }
        }


        return <CloseCircleTwoTone style={{ fontSize: '1rem', float: "right" }} twoToneColor="#FF0000" />
    }


    componentDidUpdate = () => {
        // console.log(this.state.match['matchitems'][0][0])
    }


    render(){

        if(this.state.structure && this.state.match['jobpost_result']){
            this.cat = this.state.structure[0][this.state.match['jobpost_results'][0].split(',')[0]]
            this.subcat = this.state.match['jobpost_results'][0].split(',')[1];
            this.label = this.state.match['jobpost_results'][0].split(',')[0];
        } 
            


        return (

            <Row>
                <Col span={3}></Col>
            <Col span={9}><Progress type="circle" strokeColor={item.fields.matchpercent*100 < 25 ? "red" : "#1890ff"} percent={this.state.match.matchpercent? (this.state.match.matchpercent*100).toFixed(1) : 0} /></Col>


                
                {
                this.props.match.params.matchID !== null ? 
                
                <Col span={5}>
                        { this.state.structure && this.state.match['jobpost_results'] ?
                        <div style={{ listStyleType: "none" }}>
                            <h1>{this.state.structure[0][this.label]}</h1>
                            <h3>{this.state.structure[1][this.subcat]}</h3>


                                {
                                this.state.match['jobpost_results'].map((item, key) => {
                                    var parts = item.split(',');
                                    
                                    if(this.subcat === parts[1]){
                                        if(this.label !== parts[0]){
                                            this.label = parts[0];
                                            return(
                                                <React.Fragment key={key}>
                                                    <p>{this.state.structure[3][parts[0]]}{this.existsInProject(this.label)}</p>
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
                                            <p>{this.state.structure[3][parts[0]]}
                                    {this.existsInProject(this.label)}</p>
                                        </React.Fragment>
                                    )                                    

                                }
                                }) 
                                
                                }
                        </div>
                                :
                        <Empty  />
                        }
                        </Col>

                :
                    
                    <span>No data found</span>
                }
                </Row>
        )
    }
}

export default ScanDetail;