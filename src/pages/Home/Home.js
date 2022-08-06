import React, { useEffect, useState } from 'react';
import { Spinner, Toast } from 'react-bootstrap';
import Footar from '../../components/Footar/Footar';
import Posts from '../../components/Posts/Posts';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = 'http://localhost:5000/posts';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setPosts(data)
                setLoading(false);
            })
    }, []);

    return (
        <div>
            {
                loading ?
                    <div style={{ backgroundColor: "#f8f6f6", padding: "20px 0", textAlign: "center" }}>
                            <Spinner className="loading text-center" animation="border" variant="warning" />
                    </div>
                    :
                    posts.map(post => <Posts loading={loading} posts={posts} setPosts={setPosts} post={post} key={post._id}></Posts>)
            }
            <Footar></Footar>
        </div>

    );
};

export default Home;