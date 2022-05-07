import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { UserContext } from '../../../App';

const UserProfile = () => {
    const { UserId } = useParams();
    console.log(UserId)
    const [signinUser, setSigninUser] = useContext(UserContext);
    const [user, setUser] = useState([]);
    const [image, setImage] = useState([]);

    console.log("user", user)

    useEffect(() => {
        const url = 'http://localhost:5000/allUsers';
        fetch(url)
            .then(response => response.json())
            .then(data => setUser(data))
    }, []);

    const filterUser = user.find(item => item._id === UserId);
    console.log("filterUser", filterUser)
    
    const filterEmail = user.find(e => e.email === signinUser.email);

    useEffect(() => {
        const url = 'http://localhost:5000/profilePosts?email='+signinUser.email;
        fetch(url)
            .then(response => response.json())
            .then(data => setImage(data))
    }, []);
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
                            <Col><h5>45 posts</h5></Col>
                            <Col><h5>34 followers</h5></Col>
                            <Col><h5>69 following</h5></Col>
                        </Row>
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