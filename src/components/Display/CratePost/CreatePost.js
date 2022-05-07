import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { Card, Col, Form, Row } from 'react-bootstrap';
import { UserContext } from '../../../App';

const CreatePost = () => {
    const [signinUser, setSigninUser] = useContext(UserContext);
    const [user, setUser] = useState([]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
        const url = 'http://localhost:5000/allUsers';
        fetch(url)
            .then(response => response.json())
            .then(data => setUser(data))
    }, []);
    
    const filterEmail = user.find(e => e.email === signinUser.email);
    console.log("emaildata", filterEmail)

    const onSubmit = data => {
        const postData = {
            title: data.title,
            body: data.body,
            imageURL: imageURL,
            email: signinUser.email,
            name: filterEmail.name,
            postedBy: filterEmail._id,
            likes: [],
            comments: []
        };
        console.log("data", postData);
        const url = `http://localhost:5000/addPosts`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
            .then(res => console.log("server site response successfully", res))
    };

    const handleImageUpload = event => {
        console.log(event.target.files);
        const imageData = new FormData();
        imageData.set('key', '400b38040e9dc25b9a48e040ad618446');
        imageData.append('image', event.target.files[0]);
        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                // console.log(response);
                // console.log(response.data.data.display_url)
                setImageURL(response.data.data.display_url)
            })
            .catch(function (error) {
                console.log(error);
            });

    };


    return (
        <div>
            <Card style={{ margin: "20px auto", maxWidth: '700px', padding: "20px" }}>
                <h3>Create a post</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col><Form.Control type="text" placeholder="Post title..." title="title" {...register("title")} /></Col>
                    </Row>
                    <Row>
                        <Col><textarea className="form-control" body="body" id="exampleFormControlTextarea1" type="text" placeholder="Body text..." {...register("body")} /></Col>
                    </Row>
                    <Row>
                        <h6>Upload Image</h6>
                        <Col><Form.Control type="file" onChange={handleImageUpload} /></Col>
                    </Row>
                    <Row>
                        <Col><input className="btn btn-primary" type="submit" /></Col>
                    </Row>
                </form>
            </Card>
        </div>
    );
};

export default CreatePost;