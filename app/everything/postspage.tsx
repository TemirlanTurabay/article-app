'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Post } from '.';
import styles from '../PostDetail.module.css';
const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/posts/${id}`);
                setPost(response.data);
            } catch (error) {setError('Error');} finally {setLoading(false);}
        };
        if (id) {fetchPost();}
    }, [id]);
    if (loading) {return <div>Loading...</div>;}
    if (error) {return <div>{error}</div>;}
    if (!post) {return <div>Not found</div>;}
    return (
        <div className={styles.postDetailContainer}>
            <div className={styles.postDetailHeader}>
                <h2>{post.title}</h2>
                <p>{post.body.substring(0, 100)}</p>
            </div>
            <div className={styles.postDetailAuthor}>

            </div>
            <div className={styles.postDetailBody}>
                {post.body}
            </div>
        </div>
    );
};
export default PostDetail;
