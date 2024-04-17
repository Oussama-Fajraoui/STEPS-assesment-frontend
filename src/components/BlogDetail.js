import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditBlogModal from './EditBlogModal';
import ConfirmationModal from './ConfirmationModal';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); 
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:3000/blogs/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setBlog(response.data);
        })
        .catch(error => {
            console.error('Error fetching blog details:', error);
        });
    }, [id]);

    if (!blog) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        axios.delete(`http://localhost:3000/blogs/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            navigate('/'); 
        }).catch(error => {
            console.error('Failed to delete blog:', error);
        });
    };

    return (
        <div className="flex flex-col md:flex-row justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">{blog.title}</h1>
                    <div>
                        <button onClick={() => setShowModal(true)} className="text-blue-500 hover:text-blue-700 mr-2">
                            <FontAwesomeIcon icon={faEdit} size="lg" />
                        </button>
                        <button onClick={() => setShowConfirmationModal(true)} className="text-red-500 hover:text-red-700">
                            <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                        </button>
                    </div>
                </div>
                <p className="text-justify text-lg mt-4">{blog.content}</p>
                <p className="text-sm text-gray-600 mt-2">Author: {blog.author}</p>
            </div>
            {showModal && <EditBlogModal blog={blog} onClose={() => setShowModal(false)} onUpdate={(updatedBlog) => setBlog(updatedBlog)} />}
            {showConfirmationModal && 
                <ConfirmationModal 
                    isOpen={showConfirmationModal}
                    onClose={() => setShowConfirmationModal(false)}
                    onConfirm={handleDelete}
                    message="Are you sure you want to delete this blog?"
                />
            }
        </div>
    );
};

export default BlogDetail;
