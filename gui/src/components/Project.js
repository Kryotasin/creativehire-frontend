import React from 'react';
import { List } from 'antd';



const Project = (props) => {
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
        itemLayout="vertical"
        size="large"
        pagination={{
        onChange: page => {
            // console.log(page);
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
          title={<a href={"/project/" + item.id} >{item.title}</a>}
          description={"Posted by " + item.project_poster_id + " on " + item.post_date}
        />
        {item.description}
      </List.Item>
    )}
  />
  )
}

export default Project;