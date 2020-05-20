import React from 'react';
import { List } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card,Progress } from 'antd';
import {Link } from 'react-router-dom';

// {id, projectid, userid, jobid, matchpercent}

const { Meta } = Card;

const projectName = {
  marginTop: "2em",
}

const parseDate = (date) => {
    var parts = date.split('-')
    var d = new Date(parts[0], parts[1], parts[2].split('T')[0]);
    return d.toDateString();
}
const Scan = (props) => {
    return (
        <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 6,
          xxl: 6,
        }}
        
        pagination={{
            onChange: page => {
                // console.log(page);
            },
            pageSize: 10,
            }}
        dataSource={props.data}
        renderItem={item => (
          <List.Item>

            <Link to={"/scan/" + item.pk}>
            <Card 
            // title={item.title}
            hoverable
            loading={item ? false : true}


        cover={
            <Progress type="circle" strokeColor={item.fields.matchpercent*100 < 25 ? "red" : "#1890ff"} percent={item.fields.matchpercent? Math.round(item.fields.matchpercent*100) : 0} />
          }

          actions={[
            <EditOutlined key="edit" />,
            <DeleteOutlined key="delete" />,
          ]}
        >
            
            <Meta
                title= {item.fields.jobtitle ? item.fields.org + " - " + item.fields.jobtitle : "No position details"}
                description={parseDate(item.fields.posted_date)}
            />
            <p style={projectName}>
              <b>Project:</b>{item.fields.project_title}
            </p>
            </Card>
            </Link>
          </List.Item>
        )}
      />
  )
}

export default Scan;