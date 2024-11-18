import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../Components/UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching( async (id) => {
        const response = await  PostService.getById(params.id);
        setPost(response.data);
    });
    const [fetchCommentsById, isComLoading, comError] = useFetching( async (id) => {
        const response = await  PostService.getCommentById(params.id);
        setComments(response.data);
    });

    useEffect(() => {
        fetchPostById(params.id)
        fetchCommentsById(params.id)
    }, []);

    return (
        <div>
            <h1>Вы попали на страницу поста c ID {params.id}</h1>
            {isLoading
                ? <Loader/>
                : <>
                    <div>{post.id}. {post.title}</div>
                    <div>{post.body}</div>
                </>
            }
            <h1>
                Комментарии
            </h1>
            {isComLoading
                ? <Loader/>
                : <div>
                    {comments.map((comment) => (
                        <div style={{marginTop: 25}} key={comment.id}>
                            <div style={{display: 'flex',alignItems: 'center', gap: 30}}>
                                <h4>
                                    Name: {comment.name}
                                </h4>
                                <h4>
                                    Email: {comment.email}
                                </h4>
                            </div>

                            <div>
                                <p>{comment.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            }

        </div>
    );
};

export default PostIdPage;