import React, { useState } from 'react';
import MyButton from '../components/Button';
import Alert from '../components/Alert';
import { IonInput, IonItem, IonIcon } from '@ionic/react';
import { eyeOffOutline, eyeOutline, lockClosedOutline, mailOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import Lottie from 'react-lottie';
import loadingAnimation from '../components/Loading2.json';

interface LoginProps {
    onSignUpClick: () => void;
}

const roundedTextField = {
    borderRadius: '20px',
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

const LoginPage: React.FC<LoginProps> = ({ onSignUpClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState<'success' | 'error'>('error');
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const handleLogin = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                setAlertType('success');
                setShowAlert(true);
            } else {
                if (response.status === 401) {
                    setError('Invalid email or password');
                } else {
                    setError('An unexpected error occurred');
                }
                setAlertType('error');
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An unexpected error occurred');
            setAlertType('error');
            setShowAlert(true);
        } finally {
            setLoading(false);
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

    const validatePassword = (value: string) => {
        if (!value) {
            setPasswordError('Password is required');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = () => {
        validateEmail(email);
        validatePassword(password);

        if (!emailError && !passwordError) {
            handleLogin();
        } else {
            setShowAlert(true);
        }

        try {
            // API request code
        } catch (error) {
            console.error('Error:', error);
            setError('An unexpected error occurred');
            setAlertType('error');
            setShowAlert(true);
        }
    };

    return (
        <div className="container" style={textColorStyle}>
            {loading && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Lottie options={{ animationData: loadingAnimation }} width={100} height={100} />
                </div>
            )}
            <h1 style={{ ...textColorStyle, ...boldTextStyle }}>Welcome to TurfScout</h1>
            <IonItem style={{ ...roundedTextField, borderColor: emailError ? 'red' : '' }}>
                <IonIcon icon={mailOutline} slot="start" style={iconColorStyle} />
                <IonInput
                    placeholder='Email'
                    type="email"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value!)}
                    style={textColorStyle}
                />
            </IonItem>
            <div style={{ marginBottom: '16px' }} />
            <IonItem style={roundedTextField}>
                <IonIcon icon={lockClosedOutline} slot="start" style={iconColorStyle} />
                <IonInput
                    placeholder='Password'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                    style={textColorStyle}
                />
                <IonIcon
                    icon={showPassword ? eyeOffOutline : eyeOutline}
                    slot="end"
                    onClick={() => setShowPassword(!showPassword)}
                    style={iconColorStyle}
                />
            </IonItem>
            <div style={{ marginBottom: '16px' }} />

            <MyButton text="Login" onClick={handleSubmit} />
            <p style={{ textAlign: 'center' }}>Don't have an account? <span onClick={onSignUpClick} style={{ ...textColorStyle, ...boldTextStyle }}>Sign Up</span></p>
            <p style={{ textAlign: 'center' }}><span onClick={() => console.log('Forgot password clicked')} style={textColorStyle}>Forgot Password?</span></p>

            <Alert
                isOpen={showAlert}
                type={alertType}
                content={alertType === 'success' ? 'You have logged in successfully.' : error}
                onClose={() => {
                    setShowAlert(false);
                    if (alertType === 'success') {
                        history.push('/home');
                    }
                }}
            />
        </div>
    );
};

export default LoginPage;
