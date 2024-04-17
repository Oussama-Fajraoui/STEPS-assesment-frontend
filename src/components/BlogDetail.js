import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
    const { id } = useParams(); 
    const [blog, setBlog] = useState(null);

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
        .catch(error => console.error('Error fetching blog details:', error));
    }, [id]); 

    if (!blog) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{blog.title}</h1>
            <p>{blog.content}</p>
            <p>Author: {blog.author}</p>
        </div>
    );
};

export default BlogDetail;
