import React, { useEffect, useState } from 'react';
import Home from './Home/Home';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:5000/allPosts';
        fetch(url)
            .then(response => response.json())
            .then(data => setPosts(data))
    }, []);
    return (
        <div>
            {posts.map(post => <Home post={post} key={post._id}></Home>)}
        </div>
    );
};

export default Posts;