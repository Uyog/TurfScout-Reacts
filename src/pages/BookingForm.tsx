import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonLabel, IonItem, IonInput, IonButton, IonText } from '@ionic/react';
import moment from 'moment';

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
      // Directly using the bookingTime as 'HH:mm' format (24-hour format)
      const formattedBookingTime = moment(bookingTime, 'HH:mm').format('HH:mm');

      const response = await axios.post('http://127.0.0.1:8000/api/booking', {
        turf_id: turfId,
        booking_time: formattedBookingTime,
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
      console.error(error.response?.data);
      setError(error.response?.data?.error || 'Error creating booking. Please try again later.');
      
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
        {error && <IonText color="danger"><p>{error}</p></IonText>}
        <IonItem>
          <IonLabel position="stacked">Booking Time</IonLabel>
          <IonInput
            type="time"
            value={bookingTime}
            onIonChange={(e) => setBookingTime(e.detail.value!)}
            placeholder="HH:MM"
          />
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
