import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
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
        const url = 'http://localhost:5000/profilePosts?email=' + email;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("postData:", data)
                setImage(data)
            })
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
            .then(res => res.json())
            .then(result => {
                const url = 'http://localhost:5000/allUsers';
                fetch(url)
                    .then(res => res.json())
                    .then(data => setUser(data))
            });
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
            .then(res => res.json())
            .then(result => {
                const url = 'http://localhost:5000/allUsers';
                fetch(url)
                    .then(res => res.json())
                    .then(data => setUser(data))
            });
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
            .then(res => res.json())
            .then(result => {
                const url = 'http://localhost:5000/allUsers';
                fetch(url)
                    .then(res => res.json())
                    .then(data => setUser(data))
            });
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
            .then(res => res.json())
            .then(result => {
                const url = 'http://localhost:5000/allUsers';
                fetch(url)
                    .then(res => res.json())
                    .then(data => setUser(data))
            });
    }

    return (
        <div>
            <div style={{ maxWidth: '700px', margin: "0 auto" }}>
                <Row style={{ padding: "30px" }}>
                    <Col md={5}>
                        <img style={{ height: "160px", width: "160px", borderRadius: "80px" }} src={filterUser?.imageURL} alt="" />
                    </Col>
                    <Col md={7}>
                    <h2 style={{ fontSize: "33px", fontWeight: "400" }}>{filterUser?.name}</h2>
                        <h2 style={{ fontSize: "19px", fontWeight: "700" }}>{filterUser?.email}</h2>
                        <Row style={{ marginTop: "25px" }}>
                            <Col><h5><span style={{ fontWeight: "700" }}>{image?.length}</span> <span style={{ fontSize: "16px" }}>posts</span></h5></Col>
                            <Col><h5><span>{filterUser?.followers?.length}</span> <span style={{ fontSize: "16px" }}>followers</span></h5></Col>
                            <Col><h5><span>{filterUser?.following?.length}</span> <span style={{ fontSize: "16px" }}>following</span></h5></Col>
                        </Row>
                        {
                            filterUser?.followers?.includes(signinUser.email) ? <Button style={{width:"25%"}} onClick={() => { unfollowUser(); unfollowUsers() }} className="btn btn-primary" type="submit">Unfollow</Button>
                                : <Button style={{width:"25%"}} onClick={() => { followUser(); followUsers() }} className="btn btn-primary" type="submit">Follow</Button>
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