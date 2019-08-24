import React, { Component } from 'react';
import axios from '../../axios'; // importing from custom instance

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }
    componentDidMount () {
        console.log('[FullPost] componentDidMount')
    }

    componentDidUpdate () {
        console.log('[FullPost] componentDidUpdate')
        if (this.props.id) {
            // contition to prevent infinite loop (setState => render => repeat)
            if (
                !this.state.loadedPost || // only if no loadedPost 
                (this.state.loadedPost && this.state.loadedPost.id !== this.props.id) //OR getting new post
                ) {
                axios.get('/posts/' + this.props.id)
                .then(res => {
                    // console.log(res);
                    console.log("[FullPost] post fetched from the server")
                    console.log("[FullPost] setState")
                    this.setState({
                        loadedPost: res.data
                    })
                }) 
            }
           
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.id)
            .then(res => {
                console.log(res);
            })
    }

    render () {
        console.log('[FullPost] rendering...')
        let post = <p className="text-center">Please select a Post!</p>;
        if (this.props.id) {
            post = <p className="text-center">Loading...</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }
        
        return post;
    }
}

export default FullPost; 