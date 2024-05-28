import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonLabel, IonItem, IonInput, IonButton } from '@ionic/react';

interface BookingFormProps {
  turfId: string;
  onClose: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ turfId, onClose }) => {
  const history = useHistory();
  const [bookingTime, setBookingTime] = useState<string>('');
  const [ball, setBall] = useState<number>(0);
  const [bib, setBib] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const handleBooking = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to book a turf!');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/bookings', {
        turf_id: turfId,
        booking_time: bookingTime,
        ball: ball,
        bib: bib,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      onClose(); // Close the modal after successful booking
      history.push(`/bookings/${response.data.id}`);
    } catch (error: any) {
      setError(error.response.data.error || 'Error creating booking. Please try again later.');
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/search" />
          </IonButtons>
          <IonTitle>Create Booking</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {error && <p>{error}</p>}
        <IonItem>
          <IonLabel position="stacked">Booking Time</IonLabel>
          <IonInput value={bookingTime} onIonChange={(e) => setBookingTime(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Ball</IonLabel>
          <IonInput type="number" value={ball} onIonChange={(e) => setBall(parseInt(e.detail.value!, 10))} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Bib</IonLabel>
          <IonInput type="number" value={bib} onIonChange={(e) => setBib(parseInt(e.detail.value!, 10))} />
        </IonItem>
        <IonButton expand="block" onClick={handleBooking}>Create Booking</IonButton>
      </IonContent>
    </>
  );
};

export default BookingForm;
