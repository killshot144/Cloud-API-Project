import React, { useEffect, useState } from 'react';

const Upload = () => {
  const [posts, setPosts] = useState([]);
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

  return (
    <div className="container">
      <div className="mainpage">
        <h1>Your Facebook Posts</h1>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {!errorMessage && posts.length === 0 && <p>No posts available to display.</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {posts.map((post, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                padding: '16px',
                borderRadius: '8px',
                width: '300px',
                boxShadow: '0px 1px 1px black',
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

export default Upload;
