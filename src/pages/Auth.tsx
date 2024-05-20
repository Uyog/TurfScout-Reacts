import React, { useState } from 'react';

// Define the type of props for the Login component
interface LoginProps {
  onSignUpClick: () => void;
}

// Login component
const Login: React.FC<LoginProps> = ({ onSignUpClick }) => {
  // Component state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle login
  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
     
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Store token
        window.alert('Login successful'); // Pop-up dialogue
        window.location.href = '/home';
      } else {
        if (response.status === 401) {
          setError('Invalid email or password');
        } else {
          setError('An unexpected error occurred');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred');
    }
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
      {error && <p>{error}</p>}
    </div>
  );
};

// Define the type of props for the SignUp component
interface SignUpProps {
  onLoginClick: () => void;
}

// SignUp component
const SignUp: React.FC<SignUpProps> = ({ onLoginClick }) => {
  // Component state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signedUp, setSignedUp] = useState(false);
  const [error, setError] = useState('');

  // Function to handle sign up
  const handleSignUp = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, password_confirmation: confirmPassword })
      });
     
      if (response.ok) {
        const data = await response.json();
        console.log('Sign up successful:', data);
        setSignedUp(true);
        window.alert('Your account has been created successfully'); // Pop-up dialogue
        onLoginClick(); 
      } else {
        if (response.status === 400) {
          setError('Validation failed');
        } else {
          setError('An unexpected error occurred');
        }
      }
    } catch (error) {
      console.error('Sign up error:', error);
      setError('An unexpected error occurred');
    }
  };


  // JSX for SignUp component
  if (signedUp) {
    return (
      <div className="container">
        <h1>Sign Up Successful</h1>
        <p>Your account has been created successfully.</p>
        <p>Please <span onClick={onLoginClick}>login</span> to continue.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <input
        type="text"
        placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
      {error && <p>{error}</p>}
    </div>
  );
};

// LoginOrSignUp component
const LoginOrSignUp = () => {
  // Component state
  const [showLogin, setShowLogin] = useState(true);

  // Function to toggle between login and sign up
  const handleToggle = () => {
    setShowLogin(!showLogin);
  };

  // JSX for LoginOrSignUp component
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
