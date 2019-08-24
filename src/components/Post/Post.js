import React, { Component } from 'react';

import './Post.css';

class Post extends Component {
    componentDidMount () {
        console.log('[Post] componentDidMount');
    }
    componentDidUpdate () {
        console.log('[Post] componentDidUpdate')
    }
    render() {
        console.log('[Post] rendering...')
        return (
            <article className="Post" onClick={this.props.clicked}>
                <h1>{this.props.title}</h1>
                <div className="Info">
                    <div className="Author">{this.props.author}</div>
                </div>
            </article>
        );
    }
}
    


export default Post;