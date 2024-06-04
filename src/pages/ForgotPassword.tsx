import React, { useState } from 'react';
import MyButton from '../components/Button';
import Alert from '../components/Alert';
import { IonInput, IonItem, IonIcon } from '@ionic/react';
import { mailOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Auth.css';

const roundedTextField = {
  borderRadius: '10px',
};

const textColorStyle = {
  color: '#97FB57',
};

const boldTextStyle = {
  fontWeight: 'bold',
};

const iconColorStyle = {
  color: '#97FB57',
};

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const history = useHistory();

  const handleBackClick = () => {
    history.goBack();
};

  const handleSendResetLink = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setShowSuccessAlert(true);
      } else {
        if (response.status === 404) {
          setError('Email not found. Please check the email address and try again.');
        } else if (response.status === 422) {
          setError('Invalid email format. Please enter a valid email address.');
        } else {
          setError('An unexpected error occurred. Please try again later.');
        }
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setError('An unexpected error occurred. Please try again later.');
      setShowAlert(true);
    }
  };

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = () => {
    validateEmail(email);

    if (!emailError) {
      handleSendResetLink();
    } else {
      setShowAlert(true);
    }
  };

  return (
    <div className="container" style={textColorStyle}>
      <h1 style={{ ...textColorStyle, ...boldTextStyle, textAlign: 'center', marginBottom: 50 }}>Forgot Password</h1>
      <IonItem style={{ ...roundedTextField, borderColor: emailError ? 'red' : '' }}>
        <IonIcon icon={mailOutline} slot="start" style={iconColorStyle} />
        <IonInput
          placeholder="Email"
          type="email"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value!)}
          style={textColorStyle}
        />
      </IonItem>
      <div style={{ marginBottom: '30px' }} />

      <MyButton text="Send" onClick={handleSubmit} />

      <MyButton text="Back" onClick={handleBackClick} />

    

      
    </div>
  );
};

export default ForgotPassword;
