import React from 'react';
import { IonAlert } from '@ionic/react';

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  content: string;
  onSuccess: () => void;
}

const Alert: React.FC<AlertProps> = ({ isOpen, onClose, title, content, onSuccess }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header={title}
      message={content}
      buttons={[
        {
          text: 'OK', 
          handler: onSuccess,
        },
      ]}
      cssClass="custom-alert" // Combine multiple classes into a single attribute
      backdropDismiss={false} // Prevent dismiss by clicking on backdrop
      translucent // Make the alert translucent
      // Apply color to title
      style={{ '--ion-color-base': '#97FB57' }} // Apply color to title
    />
  );
};

export default Alert;
