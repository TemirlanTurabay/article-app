'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { Post } from '.';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
const PostsList = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [editingPostId, setEditingPostId] = useState<number | null>(null);
    const fetchPosts = async () => {
        try {
            const response = await axiosInstance.get('/posts');
            const postsData = response.data.posts;
            setPosts(postsData);
            localStorage.setItem('posts', JSON.stringify(postsData));
        } catch (error) {console.error('Error', error);}
    };
    useEffect(() => {
        const savedPosts = localStorage.getItem('posts');
        if (savedPosts) {setPosts(JSON.parse(savedPosts));} else {fetchPosts();}
    }, []);
    const handleAddPost = (post: Post) => {
        const updatedPosts = [...posts, post];
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };
    const handleUpdatePost = (updatedPost: Post) => {
        const updatedPosts = posts.map(post => post.id === updatedPost.id ? updatedPost : post);
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        setEditingPostId(null);
    };
    const handleDeletePost = (id: number) => {
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };
    return (
        <div>
            <Add onAddPost={handleAddPost} />
            {posts.map((post) => (
                <div key={post.id}>
                    <div>
                        <h2 className="postTitle">{post.title}</h2>
                        <p>{post.body.substring(0, 100)}</p>
                    </div>
                    <div>
                        {post.body}
                    </div>
                    <div>
                        <div>
                            <Delete id={post.id} onPostDeleted={handleDeletePost} />
                            <Update id={post.id} currentTitle={post.title} currentBody={post.body} onPostUpdated={handleUpdatePost} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default PostsList;
