import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { Card, Form } from 'react-bootstrap';
import { UserContext } from '../../../App';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';


const Home = (props) => {
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
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setSinglePost(data)
            })

    }, [_id]);

    const onSubmit = (data) => {
        const commentData = {
            name: filterEmail.name,
            comment: data.comment,
            uniqueKey : Date.now() + Math.random()
        };
        const url = `http://localhost:5000/comment/${singlePost._id}`;
        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(commentData)
        })
            .then(res => console.log("server like site response successfully", res))
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
            .then(res => console.log("server like site response successfully", res))
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
            .then(res => console.log("server like site response successfully", res))
    }
    const showUpdatedData = () => {
        fetch('http://localhost:5000/allPosts')
        .then(response => response.json())
        .then(data => setPosts(data))
    }
    return (
        <Card style={{ margin: "20px auto", maxWidth: '700px', padding: "20px" }}>
            <h4><Link to={postedBy !== filterEmail?._id ? `/userProfile/${postedBy}` : "/profile"}>{name}</Link></h4>
            <img src={imageURL} alt="" />
            <div className="icon" style={{ display: "flex", margin: "10px 0 5px 0", fontSize: "26px" }}>
                {
                    likes.includes(signinUser.email) ? <FontAwesomeIcon onClick={() => { unlikePostUpdate(); showUpdatedData();}} icon={faThumbsDown} />
                        : <FontAwesomeIcon onClick={() => { likePostUpdate(); showUpdatedData();}} style={{ marginRight: "10px" }} icon={faThumbsUp} />
                }
            </div>
            <h5>Likes: {likes?.length}</h5>
            <h5>{title}</h5>
            <p>{body}</p>
            {
                comments?.map(comment => <div key={comment.uniqueKey}>
                    <h4><span style={{ fontWeight: "bold" }}>{comment?.name} </span> {comment?.comment}</h4>
                </div>)
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <Form.Control className="form-control"
                    type="text"
                    comment="comment"
                    {...register("comment")}
                    placeholder="Add a new comment"
                />
                <input onClick={showUpdatedData} value="Send" className="btn btn-primary" type="submit" />
            </form>
        </Card>
    );
};

export default Home;