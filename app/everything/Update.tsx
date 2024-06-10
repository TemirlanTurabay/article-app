'use client';

import { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { Post } from '.';
const UpdatePost = ({ id, currentTitle, currentBody, onPostUpdated }: { id: number, currentTitle: string, currentBody: string, onPostUpdated: (post: Post) => void }) => {
    const [title, setTitle] = useState(currentTitle);
    const [body, setBody] = useState(currentBody);
    const [isOpen, setIsOpen] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put(`/posts/${id}`, {
                title,
                body,
            });
            onPostUpdated(response.data);
            setIsOpen(false);
        } catch (error) {
            console.error('Error', error);
        }
    };
    return (
        <>
            <button onClick={() => setIsOpen(true)}>Edit Post</button>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsOpen(false)}>&times;</span>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Title:</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Body:</label>
                                <textarea
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                />
                            </div>
                            <button type="submit">Update</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
export default UpdatePost;
