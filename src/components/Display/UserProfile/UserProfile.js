import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { UserContext } from '../../../App';

const UserProfile = () => {
    const { UserId } = useParams();
    const [signinUser, setSigninUser] = useContext(UserContext);
    const [user, setUser] = useState([]);
    const [image, setImage] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:5000/allUsers';
        fetch(url)
            .then(response => response.json())
            .then(data => setUser(data))
    }, []);

    const filterUser = user.find(item => item._id === UserId);
    const filterId = user.find(item => item.email === signinUser.email)
    console.log("filterId:", filterId);

    console.log("filterUser", filterUser)
    const email = filterUser?.email;
    useEffect(() => {
        const url = 'http://localhost:5000/profilePosts?email='+email;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("postData:", data)
                setImage(data)})
    }, [email]);

    const followUser = () => {
        const filteredId = filterId?._id;
        const url = `http://localhost:5000/follow/${UserId}`;
        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                followersEmail: signinUser.email,
                followersId: filteredId,
                followingEmail: email
            })
        })
            .then(res => console.log("server like site response successfully", res))
    }

    const followUsers = () => {
        const filteredId = filterId?._id;
        const url = `http://localhost:5000/follow`;
        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                followersEmail: signinUser.email,
                followersId: filteredId,
                followingEmail: email
            })
        })
            .then(res => console.log("server like site response successfully", res))
    }

    const unfollowUser = () => {
        const filteredId = filterId._id;
        const url = `http://localhost:5000/unfollow/${UserId}`;
        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                followersEmail: signinUser.email,
                followersId: filteredId,
                followingEmail: email
            })
        })
            .then(res => console.log("server like site response successfully", res))
    }

    const unfollowUsers = () => {
        const filteredId = filterId._id;
        const url = `http://localhost:5000/unfollow`;
        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                followersEmail: signinUser.email,
                followersId: filteredId,
                followingEmail: email
            })
        })
            .then(res => console.log("server like site response successfully", res))
    }

    const showUpdatedData = () => {
        const url = 'http://localhost:5000/allUsers';
        fetch(url)
        .then(res => res.json())
        .then(data => setUser(data))
    }

    return (
        <div>
            <div style={{ maxWidth: '700px', margin: "0 auto" }}>
                <Row style={{ padding: "30px" }}>
                    <Col md={4}>
                        <img style={{ height: "180px", width: "180px", borderRadius: "90px" }} src="https://images.unsplash.com/photo-1651342997325-a5326de3da6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                    </Col>
                    <Col md={8}>
                        <h2>{filterUser?.name}</h2>
                        <Row>
                            <Col><h5>{image?.length} posts</h5></Col>
                            <Col><h5>{filterUser?.followers?.length} followers</h5></Col>
                            <Col><h5>{filterUser?.following?.length} following</h5></Col>
                        </Row>
                        {
                    filterUser?.followers?.includes(signinUser.email) ? <input onClick={() => { unfollowUser(); unfollowUsers(); showUpdatedData();}} value="Unfollow" className="btn btn-primary" type="submit" />
                        : <input onClick={() => { followUser(); followUsers(); showUpdatedData();}} value="Follow" className="btn btn-primary" type="submit" />
                }
                    </Col>
                </Row>
            </div>
            <hr className="container" />
            <Row style={{ maxWidth: '800px', margin: "0 auto" }}>
                {
                    image.map(data =>

                        <Col key={data._id} md={4}>
                            <img style={{ height: "200px", width: "200px" }} src={data.imageURL} alt="" />
                        </Col>
                    )
                }
            </Row>
        </div>
    );
};

export default UserProfile;