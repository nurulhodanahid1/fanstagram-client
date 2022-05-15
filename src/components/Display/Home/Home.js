import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Posts from '../Posts/Posts';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = 'http://localhost:5000/allPosts';
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
                    posts.map(post => <Posts loading={loading} posts={posts} setPosts={setPosts} post={post} key={post._id}></Posts>)
            }
        </div>

    );
};

export default Home;