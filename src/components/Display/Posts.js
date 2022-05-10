import React, { useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import Home from './Home/Home';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = 'https://desolate-bayou-34351.herokuapp.com/allPosts';
        const unsubscribe = fetch(url)
            .then(response => response.json())
            .then(data => {
                setPosts(data)
                setLoading(false);
            })
            return ()=>unsubscribe;
    }, []);

    return (
        <div>

            {
                loading ?
                    <div style={{ backgroundColor: "#f8f6f6", padding: "20px 0", textAlign: "center" }}>
                            <Spinner className="loading text-center" animation="border" variant="info" />
                    </div>
                    :
                    posts.map(post => <Home loading={loading} posts={posts} setPosts={setPosts} post={post} key={post._id}></Home>)
            }
        </div>

    );
};

export default Posts;