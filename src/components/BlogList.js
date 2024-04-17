import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:3000/blogs', {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        })
        .then(response => {
            setBlogs(response.data);
        })
        .catch(error => {
            console.error('Error fetching blogs:', error);
        });
    }, []);

    return (
        <div className="space-y-4">
            {blogs.map(blog => (
                <div key={blog._id} className={`p-4 border-2 ${blog.upvotes > blog.downvotes ? 'border-green-500' : 'border-red-500'}`}>
                    <h3 className="text-lg font-bold">{blog.title}</h3>
                    <p>{blog.content.substring(0, 100)}...</p>
                    <p>Author: {blog.author}</p>
                    <a href={`/blogs/${blog._id}`} className="text-blue-500 hover:underline">Continue reading</a>
                </div>
            ))}
        </div>
    );
};

export default BlogList;
