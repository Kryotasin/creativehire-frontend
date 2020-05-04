import React from 'react';
import Articles from '../components/Article';

import axios from '../axiosConfig';

class ArticleList extends React.Component{

    state = {
        articles: []
    }

    componentDidMount() {
        axios.get('api')
            .then(res => {
                this.setState({
                    articles: res.data
                });
                //console.log(res.data);
            })
    }

    render(){
        return (
            <Articles data={this.state.articles} />
        )
    }
}

export default ArticleList;