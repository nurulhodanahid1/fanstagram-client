import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Home from './Home/Home';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:5000/allPosts';
        fetch(url)
            .then(response => response.json())
            .then(data => setPosts(data))
    }, []);
    
    const history = useHistory();
    const handleUserProfile = id => {
        history.push(`/userProfile/${id}`)
    }

    return (
        <div>
            {posts.map(post => <Home handleUserProfile={handleUserProfile} post={post} key={post._id}></Home>)}
        </div>
    );
};

export default Posts;