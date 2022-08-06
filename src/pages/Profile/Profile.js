import React, { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { Col, Form, Row, Button, Card, Spinner } from 'react-bootstrap';
import { UserContext } from '../../App';


const Profile = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [signinUser, setSigninUser] = useContext(UserContext);
    const [imageURL, setImageURL] = useState(null);
    const [user, setUser] = useState([]);
    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const url = 'https://aqueous-scrubland-65265.herokuapp.com/users';
        const unsubscribe = fetch(url)
            .then(response => response.json())
            .then(data => {
                setUser(data)
                setLoading(false)
            })
        return () => unsubscribe;
    }, []);

    const filterEmail = user.find(e => e.email === signinUser.email);

    useEffect(() => {
        const url = 'https://aqueous-scrubland-65265.herokuapp.com/profilePosts?email=' + signinUser.email;
        const unsubscribe = fetch(url)
            .then(response => response.json())
            .then(data => setImage(data))
        return () => unsubscribe;
    }, [signinUser.email]);

    const onSubmit = () => {
        if (imageURL) {
            const url = `https://aqueous-scrubland-65265.herokuapp.com/addProfilePic`;
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
                .then(res => {
                    const url = 'https://aqueous-scrubland-65265.herokuapp.com/users';
                    const unsubscribe = fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            setUser(data)
                            setSuccess(true)
                        })
                    return () => unsubscribe;})
        }
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
        window.confirm('Are you sure you wish to delete this item?') &&  fetch(`https://aqueous-scrubland-65265.herokuapp.com/deletePost/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    const url = 'https://aqueous-scrubland-65265.herokuapp.com/profilePosts?email=' + signinUser.email;
                    const unsubscribe = fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            setImage(data);
                        })
                    return () => unsubscribe;
                }
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
                </div>
                :
                <div>
                    <div style={{ maxWidth: '700px', margin: "0 auto" }}>
                        <Row style={{ padding: "30px" }}>
                            <Col md={5}>
                                <img style={{ height: "160px", width: "160px", borderRadius: "80px" }} src={filterEmail?.imageURL} alt="" />
                                <form style={{ marginTop: "15px" }} onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Control required type="file" onChange={handleImageUpload} />
                                    <Button className="signup-button" style={{width: "170px"}} type="submit">Upload profile Pic</Button>
                                    {
                                        success ? <h6 style={{ color: "#139CF7", marginTop: "10px" }}>Updated profile pic successfully!!</h6>
                                            : <h6><span style={{ color: "#ED4956", marginTop: "10px" }}>Please attach image file </span>(Confirmation message will be given when image is updated)</h6>
                                    }
                                </form>
                            </Col>
                            <Col md={7}>
                                <h2 style={{ fontSize: "33px", fontWeight: "400" }}>{filterEmail?.name}</h2>
                                <h2 style={{ fontSize: "19px", fontWeight: "700" }}>{signinUser.email}</h2>
                                <Row style={{ marginTop: "25px" }}>
                                    <Col><h5><span style={{ fontWeight: "700" }}>{image?.length}</span> <span style={{ fontSize: "16px" }}>posts</span></h5></Col>
                                    <Col><h5><span>{filterEmail?.followers?.length}</span> <span style={{ fontSize: "16px" }}>followers</span></h5></Col>
                                    <Col><h5><span>{filterEmail?.following?.length}</span> <span style={{ fontSize: "16px" }}>following</span></h5></Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>


                    <hr className="container" />
                    <Row style={{ maxWidth: '800px', margin: "0 auto" }}>
                        {
                            image.map(data =>
                                <Col style={{ marginBottom: "10px" }} key={data._id} md={4}>
                                    <Card style={{ padding: "10px" }}>
                                        <img style={{}} src={data.imageURL} alt="" />
                                        <Button style={{ backgroundColor: "#ED4956", color: "#fff", fontWeight: "bold !important", height: "40Px", width: "100%" }} onClick={() => { handleDeletePost(data._id) }}>Delete</Button>
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

export default Profile;