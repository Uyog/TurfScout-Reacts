import React, { useState } from 'react';

interface LoginProps {
  onSignUpClick: () => void;
}

const Login: React.FC<LoginProps> = ({ onSignUpClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    // Handle login logic
  };

  return (
    <div className="container">
      <h1>Welcome to TurfScout</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <span onClick={onSignUpClick}>Sign Up</span></p>
      <p><span onClick={() => console.log('Forgot password clicked')}>Forgot Password?</span></p>
    </div>
  );
};

interface SignUpProps {
  onLoginClick: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onLoginClick }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Handle sign up logic
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <p>Already have an account? <span onClick={onLoginClick}>Login</span></p>
    </div>
  );
};

const LoginOrSignUp = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggle = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      {showLogin ? (
        <Login onSignUpClick={handleToggle} />
      ) : (
        <SignUp onLoginClick={handleToggle} />
      )}
    </div>
  );
};

export default LoginOrSignUp;
