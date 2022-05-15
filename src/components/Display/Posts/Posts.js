import React, { useContext, useEffect, useState } from 'react';
import "./Posts.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, Form } from 'react-bootstrap';
import { UserContext } from '../../../App';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';


const Posts = (props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [signinUser, setSigninUser] = useContext(UserContext);
    const [singlePost, setSinglePost] = useState([]);
    const [user, setUser] = useState([]);
    const { name, title, body, _id, imageURL, likes, comments, postedBy } = props.post;
    const setPosts = props.setPosts;

    useEffect(() => {
        const url = 'http://localhost:5000/allUsers';
        fetch(url)
            .then(response => response.json())
            .then(data => setUser(data))
    }, []);

    const filterEmail = user.find(e => e.email === signinUser.email);

    useEffect(() => {
        const url = `http://localhost:5000/post/${_id}`;
        const unsubscribe = fetch(url)
            .then(res => res.json())
            .then(data => {
                setSinglePost(data)
            })
            return ()=>unsubscribe
    }, []);

    const onSubmit = (data) => {
        const commentData = {
            name: filterEmail.name,
            comment: data.comment,
            uniqueKey: Date.now() + Math.random()
        };
        const url = `http://localhost:5000/comment/${singlePost._id}`;
        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(commentData)
        })
            .then(res => fetch('http://localhost:5000/allPosts')
            .then(response => response.json())
            .then(data => setPosts(data)))
    }

    const likePostUpdate = () => {
        const likeData = {
            email: signinUser.email
        };
        const url = `http://localhost:5000/like/${singlePost._id}`;
        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(likeData)
        })
            .then(res =>
                fetch('http://localhost:5000/allPosts')
                    .then(response => response.json())
                    .then(data => setPosts(data)))
    }
    const unlikePostUpdate = () => {
        const likeData = {
            email: signinUser.email
        };
        const url = `http://localhost:5000/unlike/${singlePost._id}`;
        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(likeData)
        })
            .then(res =>
                fetch('http://localhost:5000/allPosts')
                    .then(response => response.json())
                    .then(data => setPosts(data)))
    }
    return (
        <div style={{ backgroundColor: "#f8f6f6", padding: "20px 0" }}>
            <Card style={{ margin: "0 auto", maxWidth: '700px', padding: "20px" }}>
                <h4 style={{ marginBottom: "-5px", fontSize: "20px" }}><Link className='posted-by' style={{ textDecoration: "none" }} to={postedBy !== filterEmail?._id ? `/userProfile/${postedBy}` : "/profile"}>{name}</Link></h4>
                <hr />
                <img src={imageURL} alt="" />
                <div className="icon" style={{ display: "flex", margin: "10px 0 5px 0", fontSize: "26px" }}>
                    {
                        likes?.includes(signinUser.email) ? <FontAwesomeIcon className="love-hover" onClick={unlikePostUpdate} style={{ color: "#ED4956", fontSize: "33px" }} icon={faHeart} />
                            : <FontAwesomeIcon className="love-hover" style={{ color: "#bdc3c7", fontSize: "33px" }} onClick={likePostUpdate} icon={faHeart} />
                    }
                </div>
                <h5 style={{ fontSize: "18px", margin: "8px 0" }}>{likes?.length} likes</h5>
                <h5>{name} <span style={{ fontWeight: "500", fontSize: "16px" }}>{title}</span></h5>
                <p>{body}</p>
                {
                    comments?.map(comment => <div key={comment.uniqueKey}>
                        <h4><span style={{ fontSize: "19px", margin: "8px 0" }}>{comment?.name} </span> <span style={{ fontWeight: "500", fontSize: "15px" }}>{comment?.comment}</span></h4>
                    </div>)
                }
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Control className="form-control"
                        type="text"
                        comment="comment"
                        {...register("comment")}
                        placeholder="Write a comment"
                    />
                    <Button className="signup-button" style={{ width: "90px" }} type="submit">Add</Button>
                </form>
            </Card>
        </div>
    );
};

export default Posts;