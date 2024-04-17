import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleVote = (id, type) => {
        const updatedBlogs = blogs.map(blog => {
            if (blog._id === id) {
                if (type === 'upvote') {
                    blog.upvotes += 1;
                } else if (type === 'downvote') {
                    blog.downvotes += 1;
                }
            }
            return blog;
        });
        setBlogs(updatedBlogs);
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border rounded"
            />
            {filteredBlogs.map(blog => (
                <div key={blog._id} className={`p-4 border-2 ${getBorderColor(blog.upvotes, blog.downvotes)}`}>
                    <h3 className="text-lg font-bold">{blog.title}</h3>
                    <p>{blog.content.substring(0, 100)}...</p>
                    <p>Author: {blog.author}</p>
                    <div>
                        <button onClick={() => handleVote(blog._id, 'upvote')} className="text-green-500 hover:text-green-700 transition duration-150 ease-in-out">
                            <FontAwesomeIcon icon={faThumbsUp} /> ({blog.upvotes})
                        </button>
                        <button onClick={() => handleVote(blog._id, 'downvote')} className="text-red-500 hover:text-red-700 transition duration-150 ease-in-out">
                            <FontAwesomeIcon icon={faThumbsDown} /> ({blog.downvotes})
                        </button>
                    </div>
                    <a href={`/blogs/${blog._id}`} className="text-blue-500 hover:underline">Continue reading</a>
                </div>
            ))}
        </div>
    );
};

function getBorderColor(upvotes, downvotes) {
    if (upvotes > downvotes) {
        return 'border-green-500';
    } else if (downvotes > upvotes) {
        return 'border-red-500';
    } else {
        return 'border-gray-500';
    }
}

export default BlogList;
