import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./App.css";

const Login = ({ onLogin }) => {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '1307986103553292', // Replace with your actual App ID
        cookie: true,
        xfbml: true,
        version: 'v16.0', // Latest valid API version
      });
      setSdkLoaded(true);
      console.log('Facebook SDK Initialized');

      const token = localStorage.getItem('fb_access_token');
      if (token) {
        validateAccessToken(token);
      }
    };

    (function (d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, [navigate]);

  const validateAccessToken = (token) => {
    window.FB.api('/me', { access_token: token }, (response) => {
      if (response && !response.error) {
        setAccessToken(token);
        fetchUserInfo();
        onLogin(); // Notify parent component of login
        navigate('/upload');
      } else {
        console.error('Invalid or expired access token. Logging out...');
        localStorage.removeItem('fb_access_token');
        setAccessToken(null);
      }
    });
  };

  const handleLogin = () => {
    if (!sdkLoaded) {
      console.error('Facebook SDK not loaded yet');
      return;
    }

    window.FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        const token = response.authResponse.accessToken;
        setAccessToken(token);
        localStorage.setItem('fb_access_token', token);
        fetchUserInfo();
        onLogin(); // Notify parent component of login
        navigate('/upload');
      } else {
        window.FB.login(
          (response) => {
            if (response.authResponse) {
              const token = response.authResponse.accessToken;
              setAccessToken(token);
              localStorage.setItem('fb_access_token', token);
              fetchUserInfo();
              onLogin(); // Notify parent component of login
              navigate('/upload');
            } else {
              console.error('User cancelled login or did not fully authorize');
            }
          },
          { scope: 'public_profile,email,user_posts' }
        );
      }
    });
  };

  const fetchUserInfo = () => {
    window.FB.api('/me', { fields: 'name' }, (response) => {
      if (response && !response.error) {
        setUserName(response.name);
      } else {
        console.error('Failed to fetch user information:', response.error);
      }
    });
  };

  return (
    <div className="loginpage">
      <h1>Echoes of Me</h1>
      <h2>Login to Echoes</h2>
      <div class="line-container">
    <div class="line left"></div>
    <div class="space"><p>xxxxxxxxx</p></div>
    <div class="line right"></div>
  </div>
      {!accessToken ? (
        <div className="but">  
        <button onClick={handleLogin}>Login with Facebook</button>
        <button id="google">Login with Google</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {userName}!</h2>
        </div>
      )}
    </div>
  );
};

export default Login;
