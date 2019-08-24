import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        post: [],
        selectedPostId: null,
        error: false
    }
    componentDidMount () {
        console.log('[Blog] Component did mount.')
        axios.get("/posts")
            .then(
                (res) => {
                console.log("[Blog] data fetched from server")
                const post = res.data.slice(0,4); // only the first 4 posts
                const updatedPosts = post.map(post => {
                    return {
                        ...post,
                        author: 'Shobe'
                    }
                })
                console.log("[Blog] setState")
                this.setState({
                    post: updatedPosts
                });
                // console.log(res);
                }, 
                // note: it is important to handle errors here
                // instead of a catch() block we so that we don't swallow
                // exceptions from actual bugs in components.
                (err) => {
                    console.log(err)
                    this.setState({
                    error: true
                })
            })
    }

    postSelectedHandler = (id) => {
        console.log("[Blog] postSelectedHandler - setState")
         this.setState({
             selectedPostId: id
         });
    }

    render () {
        console.log('[Blog] Rendering...')
        let posts = <p className="text-center">Server connection failed</p> // if axis.get creates an error, show this.
        if (!this.state.error) { // if no error from axis.get
            posts = this.state.post.map(post => {
                return <Post 
                            key={post.id}
                            title={post.title} 
                            author={post.author} 
                            clicked={() => this.postSelectedHandler(post.id)}/>
            })
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;