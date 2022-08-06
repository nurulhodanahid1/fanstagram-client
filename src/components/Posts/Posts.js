import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Posts.css';


const Posts = (props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [signinUser, setSigninUser] = useContext(UserContext);
    const [singlePost, setSinglePost] = useState([]);
    const [user, setUser] = useState([]);
    const { name, title, description, _id, imageURL, likes, comments, postedBy } = props.post;
    const setPosts = props.setPosts;
    const [commentUser, setCommentUser] = useState(false);
    const [likePost, setLikePost] = useState(false);
    const [unlikePost, setUnlikePost] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const url = 'https://aqueous-scrubland-65265.herokuapp.com/users';
        fetch(url)
            .then(response => response.json())
            .then(data => setUser(data))
    }, []);

    const findUser = user.find(e => e.email === signinUser.email);

    useEffect(() => {
        const url = `https://aqueous-scrubland-65265.herokuapp.com/post/${_id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setSinglePost(data)
            })
    }, []);

    const onSubmit = (data) => {
        setLoading(true);
        if (signinUser.email) {
            const commentData = {
                name: findUser.name,
                comment: data.comment,
                uniqueKey: Date.now() + Math.random()
            };
            const url = `https://aqueous-scrubland-65265.herokuapp.com/comment/${singlePost._id}`;
            fetch(url, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(commentData)
            })
                .then(res => fetch('https://aqueous-scrubland-65265.herokuapp.com/posts')
                    .then(response => response.json())
                    .then(data => {
                        setPosts(data)
                        setLoading(false);
                    }))
        } else {
            setCommentUser(true);
            setLoading(false);
        }
    }

    const likePostUpdate = () => {
        if (signinUser.email) {
            const likeData = {
                email: signinUser.email
            };
            const url = `https://aqueous-scrubland-65265.herokuapp.com/like/${singlePost._id}`;
            fetch(url, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(likeData)
            })
                .then(res =>
                    fetch('https://aqueous-scrubland-65265.herokuapp.com/posts')
                        .then(response => response.json())
                        .then(data => setPosts(data)))
        }
        else {
            setLikePost(true);
        }
    }
    const unlikePostUpdate = () => {
        if (signinUser.email) {
            const likeData = {
                email: signinUser.email
            };
            const url = `https://aqueous-scrubland-65265.herokuapp.com/unlike/${singlePost._id}`;
            fetch(url, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(likeData)
            })
                .then(res =>
                    fetch('https://aqueous-scrubland-65265.herokuapp.com/posts')
                        .then(response => response.json())
                        .then(data => setPosts(data)))
        } else {
            setUnlikePost(true);
        }
    }

    return (
        <div style={{ backgroundColor: "#f8f6f6", padding: "20px 0" }}>
            <Card style={{ margin: "0 auto", maxWidth: '600px', padding: "20px" }}>
                <h4 style={{ marginBottom: "-5px", fontSize: "20px" }}><Link className='posted-by' style={{ textDecoration: "none" }} to={postedBy !== findUser?._id ? `/userProfile/${postedBy}` : "/profile"}>{name}</Link></h4>
                <hr />
                <h5 style={{ fontWeight: "500", fontSize: "16px" }}>{title}</h5>
                <p>{description}</p>
                <img height="380" style={{ display: "inline-block", marginBottom: "10px" }} src={imageURL} alt="" />
                <div className="icon" style={{ display: "flex", margin: "10px 0 5px 0", fontSize: "26px" }}>
                    {
                        likes?.includes(signinUser.email) ? <FontAwesomeIcon onClick={unlikePostUpdate} style={{ color: "#ED4956", fontSize: "33px", cursor: "pointer" }} icon={faHeart} />
                            : <FontAwesomeIcon className="love-hover" style={{ color: "#bdc3c7", fontSize: "33px", cursor: "pointer" }} onClick={likePostUpdate} icon={faHeart} />
                    }
                </div>
                {
                    likePost && <h5 style={{ fontWeight: "500", fontSize: "16px", color: "red" }}>You must login first to like!</h5>
                }
                {
                    unlikePost && <h5 style={{ fontWeight: "500", fontSize: "16px", color: "red" }}>You must login first to unlike!</h5>
                }
                <h5 style={{ fontSize: "18px", margin: "8px 0" }}>{likes?.length} likes</h5>
                {
                    comments?.map(comment => <div key={comment.uniqueKey}>
                        <h4><span style={{ fontSize: "19px" }}>{comment?.name} </span> <span style={{ fontWeight: "500", fontSize: "15px" }}>{comment?.comment}</span></h4>
                    </div>)
                }
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Control style={{ marginTop: "15px" }} className="form-control"
                        type="text"
                        comment="comment"
                        {...register("comment")}
                        placeholder="Write a comment"
                        required
                    />
                    {
                        loading ? <Spinner style={{ marginLeft: "20px" }} className="loading text-center" animation="border" variant="primary" />
                            : <button className="common-button" type="submit">Add</button>
                    }
                    {
                        commentUser && <h5 style={{ fontWeight: "500", fontSize: "16px", color: "red" }}>You must login first to comment!</h5>
                    }
                </form>
            </Card>
        </div>
    );
};

export default Posts;
