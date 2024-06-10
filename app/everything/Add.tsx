'use client';

import { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { Post } from '.';
const Add = ({ onAddPost }: { onAddPost: (post: Post) => void }) => {
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [postError, setPostError] = useState<string | null>(null);
    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setPostError(null);
        if (!postTitle || !postBody) {
            setPostError('Title and Body are required');
            return;
        }
        try {
            const response = await axiosInstance.post('/posts/add', {
                title: postTitle,
                body: postBody,
                userId: 1
            });
            onAddPost(response.data);
            setPostTitle('');
            setPostBody('');
            setModalOpen(false);
            alert('Post added successfully!');
        } catch (error: any) {
            setPostError('Failed to add post: ' + (error.response?.data?.message || 'Unknown error'));
        }
    };
    return (
        <>
            {modalOpen ? (
                <div>
                    <div onClick={() => setModalOpen(false)}>×</div>
                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                            autoFocus
                        />
                        <textarea
                            placeholder="Tell your story..."
                            value={postBody}
                            onChange={(e) => setPostBody(e.target.value)}
                        />
                        {postError && <p style={{ color: 'red' }}>{postError}</p>}
                        <button type="submit">Add</button>
                    </form>
                </div>
            ) : (
                <div onClick={() => setModalOpen(true)}>
                    <div>
                        <h2>Title</h2>
                        <p>Type your text here...</p>
                    </div>
                    <div>POST IT</div>
                </div>
            )}
        </>
    );
};
export default Add;
