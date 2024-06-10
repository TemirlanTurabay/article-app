'use client';

import axiosInstance from '../axiosInstance';
const DeletePost = ({ id, onPostDeleted }: { id: number, onPostDeleted: (id: number) => void }) => {
    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/posts/${id}`);
            onPostDeleted(id);
        } catch (error) {console.error('Error:', error);}
    };
    return (
        <button onClick={handleDelete}>Delete</button>
    );
};
export default DeletePost;
