import React, { useState } from 'react';
import { IonModal, IonButton, IonItem, IonLabel, IonInput, IonTextarea } from '@ionic/react';
import axios from 'axios';
import './RatingPrompt.css';

type RatingPromptProps = {
  bookingId: number;
  onClose: () => void;
};

const RatingPrompt: React.FC<RatingPromptProps> = ({ bookingId, onClose }) => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  const handleRatingSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('You must be logged in to submit a rating!');
      }

      const response = await axios.post(`http://127.0.0.1:8000/api/booking/${bookingId}/rating`, {
        rating,
        review,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log('Rating submitted successfully');
        onClose();
      } else {
        throw new Error(`Error submitting rating: ${response.statusText}`);
      }
    } catch (err: any) {
      console.error('Error submitting rating:', err.message);
    }
  };

  return (
    <IonModal isOpen={true} onDidDismiss={onClose} className="half-screen-modal">
      <div className="modal-content">
        <h2>Rate the Turf</h2>
        <IonItem>
          <IonLabel position="stacked">Rating (1-5)</IonLabel>
          <IonInput
            type="number"
            value={rating}
            min="1"
            max="5"
            onIonChange={(e) => setRating(parseInt(e.detail.value!, 10))}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Review</IonLabel>
          <IonTextarea
            value={review}
            onIonChange={(e) => setReview(e.detail.value!)}
          />
        </IonItem>
        <IonButton expand="full" onClick={handleRatingSubmit}>Submit</IonButton>
        <IonButton expand="full" color="light" onClick={onClose}>Cancel</IonButton>
      </div>
    </IonModal>
  );
};

export default RatingPrompt;
