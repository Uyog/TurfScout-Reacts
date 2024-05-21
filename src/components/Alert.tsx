import React from 'react'; 
import MyButton from '../components/Button';

interface AlertProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
    onSuccess: () => void;
}

const Alert: React.FC<AlertProps> = ({ isOpen, onClose, title, content, onSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{title}</h2>
        <p className="modal-content">{content}</p>
        <MyButton text="OK" onClick={() => { onClose(); onSuccess(); }} />
      </div>
    </div>
  );
};

export default Alert;
