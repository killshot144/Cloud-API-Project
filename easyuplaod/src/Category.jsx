import React, { useEffect, useState } from 'react';
import "./App.css";

const Category = ({ category }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('fb_access_token');

    if (!accessToken) {
      setErrorMessage('Access token not found. Please log in again.');
      return;
    }

    // Fetch user's posts
    window.FB.api(
      '/me/posts',
      'GET',
      { access_token: accessToken, fields: 'message,created_time,full_picture' },
      (response) => {
        if (response && !response.error) {
          setPosts(response.data || []);
        } else {
          setErrorMessage(
            response.error ? response.error.message : 'Error fetching posts.'
          );
        }
      }
    );
  }, []);

  useEffect(() => {
    // Filter posts based on the category
    const filterPosts = () => {
      switch (category) {
        case 'Family':
          return posts.filter(post =>
             post.message?.toLowerCase().includes('family') ||
            post.message?.toLowerCase().includes('father') ||
            post.message?.toLowerCase().includes('mother') ||
            post.message?.toLowerCase().includes('sister') ||
            post.message?.toLowerCase().includes('brother') ||
            post.message?.toLowerCase().includes('brothers') ||
            post.message?.toLowerCase().includes('cousins')
          );
        case 'Friends':
          return posts.filter(post =>
            post.message?.toLowerCase().includes('friend')
          );
        case 'Places Visited':
          return posts.filter(post =>
            post.message?.toLowerCase().includes('visited') ||
            post.message?.toLowerCase().includes('travel') ||
            post.message?.toLowerCase().includes('trip') ||
            post.message?.toLowerCase().includes('visit')
          );
        case 'About Me':
          return posts.filter(post =>
            post.message?.toLowerCase().includes('about me') ||
            post.message?.toLowerCase().includes('bio') ||
            post.message?.toLowerCase().includes('i am') ||
            post.message?.toLowerCase().includes('me')
          );
        default:
          return posts;
      }
    };

    setFilteredPosts(filterPosts());
  }, [category, posts]);

  return (
    <div className="main-container">
      <div className="mainpage">
        <h1>{category} Posts</h1>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {!errorMessage && filteredPosts.length === 0 && (
          <p>No posts available in this category.</p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {filteredPosts.map((post, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                padding: '16px',
                borderRadius: '8px',
                width: '300px',
                boxShadow:'0px 1px 1px black'
              }}
            >
              <p>
                <strong>Message:</strong> {post.message || 'No message'}
              </p>
              <p>
                <strong>Created:</strong> <span className="layout">{new Date(post.created_time).toLocaleString()}</span>
              </p>
              {post.full_picture && (
                <img
                  src={post.full_picture}
                  alt="Post"
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2024 My Personal Gallery. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Category;
