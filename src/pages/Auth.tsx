import React, { useState } from 'react';
import Lottie from 'react-lottie';
import loadingAnimation from '../components/Loading2.json';
import Login from './Login';
import SignUp from './SignUp';
import './Auth.css'; // Ensure to import your CSS file

const LoginOrSignUp: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="outer-container">
      {loading && (
        <div className="loading-overlay">
          <Lottie options={{ animationData: loadingAnimation }} width={100} height={100} />
        </div>
      )}
      <h1 className="welcome-heading">
        Welcome to TurfScout!
      </h1>
      <div className="center-container">
        <div className={`card ${showLogin ? '' : 'is-flipped'}`}>
          <div className="card-inner">
            <div className="front">
              <Login onSignUpClick={handleToggle} />
            </div>
            <div className="back">
              <SignUp onLoginClick={handleToggle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginOrSignUp;
