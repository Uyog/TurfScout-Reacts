import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonLabel } from '@ionic/react';

type Turf = {
  id: number;
  name: string;
  location: string;
};

type Booking = {
  id: number;
  turf: Turf;
  pitch_number: number;
  formatted_booking_time: string;
  formatted_booking_date: string;
  booking_status: string;
  total_price: number;
};

interface BookingStatusProps {
    bookingData: Booking[]; // Define the type for bookingData prop
  }
  

const BookingStatus: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to fetch bookings!');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/bookings', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          const fetchedBookings = Array.isArray(response.data) ? response.data : [];
          setBookings(fetchedBookings);
        } else {
          setError(`Error fetching bookings: ${response.statusText}`);
        }
      } catch (err: any) {
        console.error('Error fetching bookings:', err);
        setError(`Error fetching bookings: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const currentBooking = bookings
    .filter(booking => booking.booking_status === 'pending' || booking.booking_status === 'in progress')
    .sort((a, b) => new Date(b.formatted_booking_time).getTime() - new Date(a.formatted_booking_time).getTime())[0];

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{currentBooking?.turf.name}</IonCardTitle>
        <IonCardSubtitle>{currentBooking?.turf.location}</IonCardSubtitle>
        <IonCardSubtitle>{currentBooking?.formatted_booking_date}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem>
          <IonLabel>
            <h2><strong>Pitch Number:</strong> {currentBooking?.pitch_number}</h2>
            <p><strong>Time:</strong> {currentBooking?.formatted_booking_time}</p>
            <p><strong>Status:</strong> {currentBooking?.booking_status}</p>
            <p><strong>Total Price:</strong> kshs {currentBooking?.total_price.toFixed(2)}</p>
          </IonLabel>
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
};

export default BookingStatus;
