import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlogForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        axios.post('http://localhost:3000/blogs', { title, content, author }, {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        })
        .then(() => {
            navigate('/');
        })
        .catch(error => {
            console.error('Error adding blog:', error);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="border px-2 py-1" required />
            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" className="border px-2 py-1" required />
            <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" className="border px-2 py-1" required />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Blog</button>
        </form>
    );
};

export default BlogForm;
