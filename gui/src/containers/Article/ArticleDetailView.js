import React from 'react';
import axios from '../../axiosConfig';

import { Card } from 'antd';

class ArticleDetail extends React.Component{

    state = {
        article: {}
    }

    componentDidMount() {
        const articleID = this.props.match.params.articleID;
        axios.get('api/' + articleID)
            .then(res => {
                this.setState({
                    article: res.data
                });
                console.log(res.data);
            })
    }

    render(){
        return (
            <Card title={this.state.article.title}>
                <p>{this.state.article.content}</p>
            </Card>
        )
    }
}

export default ArticleDetail;