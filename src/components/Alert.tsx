import React from 'react';
import Lottie from 'react-lottie';
import successAnimation from '../components/Tick.json'; 
import errorAnimation from '../components/Failed.json'; 

interface AlertProps {
  isOpen: boolean;
  type: 'success' | 'error';
  content: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ isOpen, type, content, onClose }) => {
  if (!isOpen) return null;

  const animationData = type === 'success' ? successAnimation : errorAnimation;
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.alertBox}>
        <Lottie options={defaultOptions} height={100} width={100} />
        <p style={styles.message}>{content}</p>
        <button onClick={onClose} style={styles.button}>OK</button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    backgroundColor: '#000',
    color: '#0f0',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
    width: '300px',
  },
  message: {
    margin: '20px 0',
  },
  button: {
    backgroundColor: '#0f0',
    color: '#000',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
};

export default Alert;
