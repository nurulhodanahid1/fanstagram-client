import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { UserContext } from '../../../App';

const CreatePost = () => {
    const [signinUser, setSigninUser] = useContext(UserContext);
    const [user, setUser] = useState([]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const url = 'https://desolate-bayou-34351.herokuapp.com/allUsers';
        const unsubscribe = fetch(url)
            .then(response => response.json())
            .then(data => setUser(data))
            return ()=>unsubscribe
    }, []);
    
    const filterEmail = user.find(e => e.email === signinUser.email);

    const onSubmit = data => {
        if(imageURL){
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
            const url = `https://desolate-bayou-34351.herokuapp.com/addPosts`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
                .then(res => setSuccess(true))
        }
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
        <div style={{ backgroundColor: "#f8f6f6", padding: "20px 0" }}>
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
                        <Col><Button className="signup-button" style={{width:"110px"}} type="submit">Add post</Button></Col>
                    </Row>
                    {
                        success ? <Row>
                            <Col><h6 style={{color:"#139CF7", marginTop:"10px"}}>Post Created successfully!!</h6></Col>
                        </Row> : <Row>
                            <Col><h6><span style={{color:"#ED4956", marginTop:"10px"}}>Please attach image file </span>(Confirmation message will be given when post is uploaded)</h6></Col>
                        </Row>
                    }
                </form>
            </Card>
        </div>
    );
};

export default CreatePost;