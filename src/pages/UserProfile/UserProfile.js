import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Button, Card, Spinner } from 'react-bootstrap';
import { UserContext } from '../../App';

const UserProfile = () => {
    const { UserId } = useParams();
    const [signinUser, setSigninUser] = useContext(UserContext);
    const [user, setUser] = useState([]);
    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = 'https://aqueous-scrubland-65265.herokuapp.com/users';
        const unsubscribe = fetch(url)
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                setUser(data)
            })
        return () => unsubscribe
    }, []);

    const filterUser = user.find(item => item._id === UserId);
    const filterId = user.find(item => item.email === signinUser.email)
    // console.log("filterId:", filterId);

    // console.log("filterUser", filterUser)
    const email = filterUser?.email;
    useEffect(() => {
        const url = 'https://aqueous-scrubland-65265.herokuapp.com/profilePosts?email=' + email;
        const unsubscribe = fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log("postData:", data)
                setImage(data)
            })
        return () => unsubscribe;
    }, [email]);

    const followUser = () => {
        const filteredId = filterId?._id;
        const url = `https://aqueous-scrubland-65265.herokuapp.com/follow/${UserId}`;
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
            .then(res => {
                const url = 'https://aqueous-scrubland-65265.herokuapp.com/users';
                fetch(url)
                    .then(res => res.json())
                    .then(data => setUser(data))
            })

    }

    const followUsers = () => {
        const filteredId = filterId?._id;
        const url = `https://aqueous-scrubland-65265.herokuapp.com/follow`;
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
            .then(res => {
                const url = 'https://aqueous-scrubland-65265.herokuapp.com/users';
                fetch(url)
                    .then(res => res.json())
                    .then(data => setUser(data))
            })
    }

    const unfollowUser = () => {
        const filteredId = filterId._id;
        const url = `https://aqueous-scrubland-65265.herokuapp.com/unfollow/${UserId}`;
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
            .then(res => {
                const url = 'https://aqueous-scrubland-65265.herokuapp.com/users';
                fetch(url)
                    .then(res => res.json())
                    .then(data => setUser(data))
            })

    }

    const unfollowUsers = () => {
        const filteredId = filterId._id;
        const url = `https://aqueous-scrubland-65265.herokuapp.com/unfollow`;
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
            .then(res => {
                const url = 'https://aqueous-scrubland-65265.herokuapp.com/users';
                fetch(url)
                    .then(res => res.json())
                    .then(data => setUser(data))
            })
    }

    return (
        <div style={{ backgroundColor: "#f8f6f6", paddingTop: "20px" }}>
            {loading ?
                <div style={{ maxWidth: '700px', margin: "0 auto" }}>
                    <Row>
                        <Col className="text-center">
                            <Spinner animation="border" variant="info" />
                        </Col>
                    </Row>
                </div> :
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
                                    filterUser?.followers?.includes(signinUser.email) ? <Button className="signup-button" style={{ width: "90px" }} onClick={() => { unfollowUser(); unfollowUsers() }} type="submit">Unfollow</Button>
                                        : <Button className="signup-button" style={{ width: "90px" }} onClick={() => { followUser(); followUsers() }} type="submit">Follow</Button>
                                }
                            </Col>
                        </Row>
                    </div>
                    <hr className="container" />
                    <Row style={{ maxWidth: '800px', margin: "0 auto" }}>
                        {
                            image.map(data =>

                                <Col style={{ marginBottom: "10px" }} key={data._id} md={4}>
                                    <Card style={{ padding: "10px" }}>
                                        <img style={{ height: "200px", width: "200px" }} src={data.imageURL} alt="" />
                                    </Card>
                                </Col>
                            )
                        }
                    </Row>
                </div>
            }

        </div>
    );
};

export default UserProfile;