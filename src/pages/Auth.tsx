import React, { useState } from 'react';
import Lottie from 'react-lottie';
import loadingAnimation from '../components/Loading2.json';
import Login from './Login';
import SignUp from './SignUp';

const LoginOrSignUp = () => {

  const [showLogin, setShowLogin] = useState(true);
  const [loading, setLoading] = useState(false);


  const handleToggle = () => {
    setShowLogin(!showLogin);
  };


  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {loading && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Lottie options={{ animationData: loadingAnimation }} width={100} height={100} />
        </div>
      )}
      <div style={{ width: '300px', margin: '0 auto' }}>
        {showLogin ? (
          <Login onSignUpClick={handleToggle} />
        ) : (
          <SignUp onLoginClick={handleToggle} />
        )}
      </div>
    </div>
  );
};

export default LoginOrSignUp;
