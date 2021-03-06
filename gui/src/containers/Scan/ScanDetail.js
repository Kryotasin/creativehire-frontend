import React from 'react';
// import axios from 'axios';
import { Spin, Popover, Space, Skeleton, Typography, Progress, Row, Col, Empty, Divider, Button  } from 'antd';
import axios from '../../axiosConfig';
import {Helmet} from "react-helmet";

import { InfoCircleTwoTone, CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

const { Title, Text } = Typography;

var psl = require('psl');

class ScanDetail extends React.Component{

    cat = null;

    subcat = null;

    label = null;

    loading = false;

    constructor(props) {
        super(props);
        this.state = {
            match: {},
            structure: null,
            processed: null,
            job: null,
            project: null,
            work: null,
            projectid: null,
            jobid: null
        }
    }


    componentDidMount() {
        const matchID = this.props.match.params.matchID;
        const scans = 'scans/' + matchID + '/';
        const metricsStructure = 'metrics-structure/';

        axios.get('scans/' + matchID + '/')
            .then(scanRes => {
                if(scanRes.status === 200){
                    this.setState({
                        match: scanRes.data
                    });
                    
                    axios.get('/metrics-structure/')
                    .then(msRes => {
                        if(msRes.status === 200){
                            this.setState({structure: msRes.data});
                        }
                    })

                    const project = 'project/' + scanRes.data.projectid;
                    this.setState({
                        projectid: scanRes.data.projectid
                    });

                    const job = 'jobpost/' + scanRes.data.jobid;

                    this.setState({
                        jobid: scanRes.data.jobid
                    });
                    
                    axios.get(project)
                    .then(projectRes => {
                        this.setState({
                            project: projectRes.data
                        });
                    })
                    .catch(projectErr => {
                        if(projectErr.response.status == '404'){
                            this.setState({
                                project: null
                            });
                        } 
                    })

                    axios.get(job)
                    .then(jobRes => {
                        this.setState({
                            job: jobRes.data
                        })
                    })
                    .catch(jobErr => {
                        if(jobErr.response.status == '404'){
                            this.setState({
                                job: null
                            });
                        } 
                    })
                }

            })
            .catch(err => {
                if(err.response.status == '404'){
                    this.props.history.push('/my-scans/')
                } 
            })
    }

    handleDelete = (event) => {
        this.loading = true;
        this.setState({
            work: "Deleting scan details"
        })
        const matchID = this.props.match.params.matchID;
        axios.delete('scans/' + matchID + '/');

        this.setState({
            work: "Deleting project details"
        });
        axios.delete('project/' + this.state.projectid + '/');

        
        this.setState({
            work: "Deleting job details"
        })
        axios.delete('jobpost/' + this.state.jobid + '/');

        this.setState({
            work: "Delete complete"
        })

        this.loading = false;

        this.props.history.push('/my-scans/');
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

    extractHostname = (url) => {
        var hostname;
        //find & remove protocol (http, ftp, etc.) and get hostname
    
        if (url.indexOf("//") > -1) {
            hostname = url.split('/')[2];
        }
        else {
            hostname = url.split('/')[0];
        }
    
        //find & remove port number
        hostname = hostname.split(':')[0];
        //find & remove "?"
        hostname = hostname.split('?')[0];
    
        return hostname;
    }


    render(){

        if(this.state.structure && this.state.match['jobpost_result']){
            this.cat = this.state.structure[0][this.state.match['jobpost_results'][0].split(',')[0]]
            this.subcat = this.state.match['jobpost_results'][0].split(',')[1];
            this.label = this.state.match['jobpost_results'][0].split(',')[0];
        } 
            
        return (
            <div>  
            <Helmet>
              <meta charSet="utf-8" />
              <title>Scan</title>
            </Helmet>
            <Spin tip={this.state.work} spinning={this.loading}>
                <Row gutter={[16, 16]}>
                    <Col span={3} />
                    <Col span={9}><Title level={3}>Project Details</Title></Col>
                    <Col span={9}><Title level={3}>Job Detail</Title></Col>
                    <Col span={3} />
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={3} />
                    <Col span={9}>
                    {// Project Details
                    }
                        <Row gutter={[16, 16]}>
                            <Col>
                                <Text strong>Project Title:</Text>
                            </Col>
                            <Col>
                                {this.state.project ? this.state.project.title
                                :
                                <Skeleton.Input active="true" size="small" />}
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col>
                                <Text strong>Project Link:</Text>
                            </Col>
                            <Col>
                            {this.state.project ? <a target="_blank"  href={this.state.project.url}>{psl.get(this.extractHostname(this.state.project.url))}</a>
                                :
                                <Skeleton.Input active="true" size="small" />}
                            </Col>
                        </Row>
                    </Col>
                
                    <Col span={9}>
                        {// Job Details
                        }
                    <Row gutter={[16, 16]}>
                        <Col>
                            <Text strong>Job Title:</Text>
                        </Col>
                        <Col>
                            {this.state.job ? this.state.job.title
                            :
                            <Skeleton.Input active="true" size="small" />}
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col>
                            <Text strong>Jobpost Link:</Text>
                        </Col>
                        <Col span={9}>
                            {this.state.job ? <a target="_blank"  href={this.state.job.link_jp}>{psl.get(this.extractHostname(this.state.job.link_jp))}</a>
                            : 
                            <Skeleton.Input active="true" size="small" />}
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col>
                            <Text strong>Company:</Text>
                        </Col>
                        <Col>
                            {this.state.job ? this.state.job.org
                            :
                            <Skeleton.Input active="true" size="small" />}
                        </Col>
                    </Row>
                </Col>
                <Col span={3} />
            </Row>

            <Divider />

            <Row gutter={[24, 12]}>
                <Col span={3}>
                </Col>
                <Col span={9}>
                    <Title level={3}>Match</Title>
                </Col>
                <Col span={10}>
                    <Title level={3}>Match details</Title>
                </Col>
                <Col span={2}>
                </Col>
            </Row>
            
            <Row gutter={[24, 24]}>
                <Col span={2}></Col>
                <Col span={10}><Progress type="circle" percent={this.state.match.matchpercent? Math.round(this.state.match.matchpercent*100): 0} /></Col>

                {
                this.props.match.params.matchID !== null ? 
                
                <Col span={5}>
                    { this.state.structure && this.state.match['jobpost_results'] ?
                    <div style={{ listStyleType: "none" }}>
                        {/* <Title level={2}>{this.state.structure[0][this.label]}</Title>
                        <Title level={4}>{this.state.structure[1][this.subcat]}</Title> */}


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
                                        <Title level={4}>{
                                            this.cat === this.state.structure[0][this.label] ?
                                            ''
                                            :
                                            this.cat = this.state.structure[0][this.label]
                                            }</Title>
                                        <Text strong>{this.state.structure[1][parts[1]]}</Text>
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
                
                <Divider />
                <Row gutter={[24, 12]}>
                    <Col span={8}/>
                    <Col span={10}>
                        <Space size="large">
                        <Popover content="This will delete all related project and job decriptions.">
                            <InfoCircleTwoTone twoToneColor="#FF0000"/>
                        </Popover>
                        <Popover content="This will delete all related project and job decriptions.">
                            <Button danger onClick={this.handleDelete}>
                                Delete this Scan
                            </Button>                        
                        </Popover>
                        </Space>
                    </Col>
                    <Col span={6}/>
                </Row>
                </Spin>
                </div>
        )
    }
}

export default ScanDetail;