import React, { useState } from 'react';
import Dialog from '../components/Dialogue';
import './Auth.css';
import { IonInput, IonItem, IonLabel, IonButton } from '@ionic/react';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        window.location.href = '/home';
      } else {
        if (response.status === 401) {
          setError('Invalid email or password');
        } else {
          setError('An unexpected error occurred');
        }
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred');
      setIsDialogOpen(true);
    }
  };
  return (
    <div className="container">
      <h1>Welcome to TurfScout</h1>
      <IonItem>
        <IonLabel position="floating">Email</IonLabel>
        <IonInput
          type="email"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value!)}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Password</IonLabel>
        <IonInput
          type="password"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)}
        />
      </IonItem>
      {error && <p>{error}</p>}
      <IonButton onClick={handleLogin}>Login</IonButton>
      <p>Don't have an account? <span onClick={onSignUpClick}>Sign Up</span></p>
      <p><span onClick={() => console.log('Forgot password clicked')}>Forgot Password?</span></p>
      


      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Error"
        content="Something went wrong!"
        actionText="OK"
        onAction={() => setIsDialogOpen(false)}
      />
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        onLoginClick();
      } else {
        if (response.status === 400) {
          setError('Validation failed');
        } else {
          setError('An unexpected error occurred');
        }
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.error('Sign up error:', error);
      setError('An unexpected error occurred');
      setIsDialogOpen(true);
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
      <IonItem>
        <IonLabel position="floating">Username</IonLabel>
        <IonInput
          type="text"
          value={name}
          onIonChange={(e) => setName(e.detail.value!)}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Email</IonLabel>
        <IonInput
          type="email"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value!)}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Password</IonLabel>
        <IonInput
          type="password"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Confirm Password</IonLabel>
        <IonInput
          type="password"
          value={confirmPassword}
          onIonChange={(e) => setConfirmPassword(e.detail.value!)}
        />
      </IonItem>
      {error && <p>{error}</p>}
      <IonButton onClick={handleSignUp}>Sign Up</IonButton>
      <p>Already have an account? <span onClick={onLoginClick}>Login</span></p>


      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Error"
        content="Something went wrong!"
        actionText="OK"
        onAction={() => setIsDialogOpen(false)}
      />
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
    <div className="center-container">
      <div className="login-signup-container">
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
