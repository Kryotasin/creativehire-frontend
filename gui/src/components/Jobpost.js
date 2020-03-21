import React from 'react';
import { List } from 'antd';



const Jobposts = (props) => {
    return (
        <List
        itemLayout="vertical"
        size="large"
        pagination={{
        onChange: page => {
            console.log(page);
        },
        pageSize: 3,
        }}
        dataSource={props.data}
        renderItem={item => (
        <List.Item
            key={item.title}
            
            extra={
            <img
                width="100px"
                alt={item.img}
                src={item.img}
            />
            }
        >
        <List.Item.Meta
          title={<a href={"/jobpost/" + item.id} >{item.title}</a>}
          description={"Posted by " + item.job_poster_id + " on " + item.post_date}
        />
        {item.description}
      </List.Item>
    )}
  />
  )
}

export default Jobposts;