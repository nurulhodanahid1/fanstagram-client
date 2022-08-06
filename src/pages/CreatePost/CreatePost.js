import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { UserContext } from '../../App';
import Footar from '../../components/Footar/Footar';

const CreatePost = () => {
    const [signinUser, setSigninUser] = useContext(UserContext);
    const [user, setUser] = useState([]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        const url = 'http://localhost:5000/users';
        fetch(url)
            .then(response => response.json())
            .then(data => setUser(data))
    }, []);

    const findUser = user.find(e => e.email === signinUser.email);

    const onSubmit = data => {
        setLoading(true);
        setSuccess(false);
        if (imageURL && findUser.email && findUser._id && data.title && data.description) {
            const postData = {
                title: data.title,
                description: data.description,
                imageURL: imageURL,
                email: signinUser.email,
                name: findUser.name,
                postedBy: findUser._id,
                likes: [],
                comments: []
            };
            const url = `http://localhost:5000/addPosts`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
                .then(res => res.json())
                .then(data => {
                    setLoading(false);
                    setSuccess(true);
                })
        } else {

        }
    };

    const handleImageUpload = event => {
        console.log(event.target.files);
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


    return (
        <div style={{ backgroundColor: "#f8f6f6", padding: "20px 0" }}>
            <Card style={{ margin: "20px auto", maxWidth: '700px', padding: "20px" }}>
                <h1 style={{ textAlign: "center", marginBottom: "50px" }}>Create a post</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <h6>Upload Image <span style={{ color: "#fc7fb2", marginTop: "10px" }}>(Please attach image file)</span></h6>
                        <Col><Form.Control required type="file" onChange={handleImageUpload} /></Col>
                    </Row>
                    <Row>
                        <Col><Form.Control required type="text" placeholder="Post title..." title="title" {...register("title")} /></Col>
                    </Row>
                    <Row>
                        <Col><Form.Control as="textarea" rows={3} required className="form-control" description="description" id="exampleFormControlTextarea1" type="text" placeholder="description text..." {...register("description")} /></Col>
                    </Row>
                    <Row>
                        <Col><button className="common-button" type="submit">Add post</button></Col>
                    </Row>
                    {
                        loading && <Spinner style={{marginLeft: "35px", marginTop: "5px"}} animation="border" variant="warning" />
                    }
                    {
                        success && <h3 style={{ color: "#fc7fb2", marginTop: "10px" }}>successfully created your post</h3>
                    }
                </form>
            </Card>
            {/* <Footar></Footar> */}
        </div>
    );
};

export default CreatePost;