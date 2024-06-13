import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonLabel, IonItem, IonInput, IonButton, IonText, IonToast } from '@ionic/react';
import Rating from 'react-rating-stars-component';
import moment from 'moment';

interface RatingFormProps {
  bookingId: string;
  bookingEndTime: string; 
  onClose: () => void;
}

const RatingForm: React.FC<RatingFormProps> = ({ bookingId, bookingEndTime, onClose }) => {
  const history = useHistory();
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [canRate, setCanRate] = useState<boolean>(false);

  useEffect(() => {
    const checkCanRate = () => {
      const currentTime = moment();
      const endTime = moment(bookingEndTime);
      if (currentTime.isAfter(endTime)) {
        setCanRate(true);
      }
    };

    checkCanRate();
    const interval = setInterval(checkCanRate, 60000); 
    return () => clearInterval(interval);
  }, [bookingEndTime]);

  const handleRating = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to submit a rating!');
      return;
    }

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/bookings/${bookingId}/rate`, {
        rating,
        review
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setToastMessage('Rating submitted successfully');
      setShowToast(true);
      onClose(); 
      history.push(`/bookings/${bookingId}`);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Error submitting rating. Please try again later.');
    }
  };

  if (!canRate) {
    return (
      <IonContent>
        <IonText color="medium">
          <p>You can only rate the turf after your session has ended.</p>
        </IonText>
      </IonContent>
    );
  }

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
          <Rating
            count={5}
            value={rating}
            onChange={(value: number) => setRating(value)}
            size={24}
            activeColor="#ffd700"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Review</IonLabel>
          <IonInput value={review} onIonChange={(e) => setReview(e.detail.value!)} />
        </IonItem>
        <IonButton expand="block" onClick={handleRating}>Submit Rating</IonButton>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
        />
      </IonContent>
    </>
  );
};

export default RatingForm;
