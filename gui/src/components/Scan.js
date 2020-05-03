import React from 'react';
import { List } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card,Progress } from 'antd';
import {Link } from 'react-router-dom';

// {id, projectid, userid, jobid, matchpercent}

const { Meta } = Card;

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
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
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

            <Link to={"scan/" + item.pk}>
            <Card 
            // title={item.title}
            hoverable
            loading={item ? false : true}


        cover={
            <Progress type="circle" percent={item.fields.matchpercent? item.matchpercent : 0} />
          }

          actions={[
            <EditOutlined key="edit" />,
            <DeleteOutlined key="delete" />,
          ]}
        >
            
            <Meta
                // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title= {item.fields.title ? item.fields.title : "No position details"}
                description={"Created on " + parseDate(item.fields.posted_date)}
            />
            </Card>
            </Link>
          </List.Item>
        )}
      />
  )
}

export default Scan;