import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonLabel, IonItem, IonInput, IonButton, IonText } from '@ionic/react';

interface RatingFormProps {
  bookingId: string;
  onClose: () => void;
}

const RatingForm: React.FC<RatingFormProps> = ({ bookingId, onClose }) => {
  const history = useHistory();
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleRating = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to submit a rating!');
      return;
    }

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/bookings/${bookingId}/rating`, {
        rating,
        review
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      onClose(); // Close the modal after successful rating submission
      history.push(`/bookings/${bookingId}`);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Error submitting rating. Please try again later.');
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/bookings" />
          </IonButtons>
          <IonTitle>Submit Rating</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {error && <IonText color="danger"><p>{error}</p></IonText>}
        <IonItem>
          <IonLabel position="stacked">Rating</IonLabel>
          <IonInput type="number" value={rating} onIonChange={(e) => setRating(parseInt(e.detail.value!, 10))} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Review</IonLabel>
          <IonInput value={review} onIonChange={(e) => setReview(e.detail.value!)} />
        </IonItem>
        <IonButton expand="block" onClick={handleRating}>Submit Rating</IonButton>
      </IonContent>
    </>
  );
};

export default RatingForm;
