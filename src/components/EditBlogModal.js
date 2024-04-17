import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const EditBlogModal = ({ blog, onClose, onUpdate }) => {
    const [title, setTitle] = useState(blog.title);
    const [content, setContent] = useState(blog.content);
    const [author, setAuthor] = useState(blog.author);  

    const handleUpdate = () => {
        const token = localStorage.getItem('token');
        axios.put(`http://localhost:3000/blogs/${blog._id}`, {
            title,
            content,
            author  
            
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            onUpdate(response.data);
            onClose();
        }).catch(error => {
            console.error('Failed to update blog:', error);
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Edit Blog</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <form className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    <label className="block text-sm font-medium text-gray-700 mt-4">Content</label>
                    <textarea value={content} onChange={e => setContent(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" rows="4"></textarea>
                    <label className="block text-sm font-medium text-gray-700 mt-4">Author</label>
                    <input type="text" value={author} onChange={e => setAuthor(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    <button type="button" onClick={handleUpdate} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditBlogModal;
