import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';
import { UserContext } from '../../../App';

const Home = (props) => {
    const [signinUser, setSigninUser] = useContext(UserContext);
    const [singlePost, setSinglePost] = useState([]);
    const { name, title, body, _id, imageURL, likes } = props.post;

    useEffect(() => {
        const url = `http://localhost:5000/post/${_id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data.likes)
                setSinglePost(data)
            })

    }, []);

    const likePostUpdate = () => {
        const likeData = {
            email: signinUser.email
        };
        console.log(JSON.stringify(likeData));
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
    return (
        <Card key={_id} style={{ margin: "20px auto", maxWidth: '700px', padding: "20px" }}>
            <h4>{name}</h4>
            <img src={imageURL} alt="" />
            <div className="icon" style={{ display: "flex", margin: "10px 0 5px 0", fontSize: "26px" }}>
                <FontAwesomeIcon onClick={likePostUpdate} style={{ marginRight: "10px" }} icon={faThumbsUp} />
                <FontAwesomeIcon icon={faThumbsDown} />
            </div>
            <h5>{title}</h5>
            <p>{body}</p>
            <input type="text" placeholder="add a comment..." />
        </Card>
    );
};

export default Home;