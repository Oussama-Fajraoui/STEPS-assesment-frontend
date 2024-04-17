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
        <div className="max-w-2xl mx-auto p-5">
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-lg font-semibold text-center">Add a New Blog</h2>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        placeholder="Enter blog title" 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                    <textarea 
                        id="content" 
                        value={content} 
                        onChange={e => setContent(e.target.value)} 
                        placeholder="Write your content here" 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                        rows="4" 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
                    <input 
                        type="text" 
                        id="author" 
                        value={author} 
                        onChange={e => setAuthor(e.target.value)} 
                        placeholder="Author's name" 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                        required 
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow"
                >
                    Add Blog
                </button>
            </form>
        </div>
    );
};

export default BlogForm;
