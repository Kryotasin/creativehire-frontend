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
          md: 1,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        
        pagination={{
            onChange: page => {
                // console.log(page);
            },
            pageSize: 6,
            }}
        dataSource={props.data}
        renderItem={item => (

          <List.Item>
          {console.log(item)}
            <Link to={"/project/" + item.pk}>
            <Card 
            hoverable
            loading={item ? false : true}


        // cover={

        // }

        >
            
            <Meta
                title= {item.fields.title ? item.fields.title : "No project title"}
                description={parseDate(item.fields.posted_date)}
            />
            {/* <p style={projectName}>
              <b>Project:</b>{item.fields.project_title}
            </p> */}
            </Card>
            </Link>
          </List.Item>
        )}
      />
  )
}

export default Scan;