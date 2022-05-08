import React, { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { Col, Form, Row, Button, Card } from 'react-bootstrap';
import { UserContext } from '../../../App';

const Profile = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [signinUser, setSigninUser] = useContext(UserContext);
    const [imageURL, setImageURL] = useState(null);
    const [user, setUser] = useState([]);
    const [image, setImage] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:5000/allUsers';
        fetch(url)
            .then(response => response.json())
            .then(data => setUser(data))
    }, []);

    const filterEmail = user.find(e => e.email === signinUser.email);

    useEffect(() => {
        const url = 'http://localhost:5000/profilePosts?email=' + signinUser.email;
        fetch(url)
            .then(response => response.json())
            .then(data => setImage(data))
    }, []);

    const onSubmit = () => {
        const url = `http://localhost:5000/addProfilePic`;
        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                imageURL: imageURL,
                userId: filterEmail._id
            })
        })
            .then(res => console.log("server profile pic site response successfully", res))
    };

    const handleImageUpload = event => {
        const imageData = new FormData();
        imageData.set('key', '400b38040e9dc25b9a48e040ad618446');
        imageData.append('image', event.target.files[0]);
        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleDeletePost = (id) => {
        fetch(`http://localhost:5000/deletePost/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    console.log(result);
                }
            })
    }

    const showUpdatedData = () => {
        const url = 'http://localhost:5000/allUsers';
        fetch(url)
            .then(response => response.json())
            .then(data => setUser(data))
    }

    return (
        <div>
            <div style={{ maxWidth: '700px', margin: "0 auto" }}>
                <Row style={{ padding: "30px" }}>
                    <Col md={4}>
                        <img style={{ height: "180px", width: "180px", borderRadius: "90px" }} src={filterEmail?.imageURL} alt="" />
                        <form style={{ marginTop: "15px" }} onSubmit={handleSubmit(onSubmit)}>
                            <h5>Upload Pic</h5>
                            <Form.Control type="file" onChange={handleImageUpload} />
                            <input onClick={showUpdatedData} className="btn btn-primary" type="submit" />
                        </form>
                    </Col>
                    <Col md={8}>
                        <h2>{filterEmail?.name}</h2>
                        <h4>{signinUser.email}</h4>
                        <Row style={{ marginTop: "25px" }}>
                            <Col><h5>{image?.length} posts</h5></Col>
                            <Col><h5>{filterEmail?.followers?.length} followers</h5></Col>
                            <Col><h5>{filterEmail?.following?.length} following</h5></Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <hr className="container" />
            <Row style={{ maxWidth: '800px', margin: "0 auto" }}>
                {
                    image.map(data =>

                        <Col key={data._id} md={4}>
                            <Card>
                                <img style={{}} src={data.imageURL} alt="" />
                                <h4>{data.title}</h4>
                                <Button onClick={() => { handleDeletePost(data._id) }}>Delete</Button>
                            </Card>
                        </Col>
                    )
                }
            </Row>
        </div>
    );
};

export default Profile;