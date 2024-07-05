import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonLabel } from '@ionic/react';
import Lottie from 'react-lottie';
import animationData from '../components/Welcome.json'; // Replace with your Lottie animation file
import RatingPrompt from './RatingPrompt'; // Import the RatingPrompt component
import moment from 'moment';

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
  booking_end_time: string;
  booking_status: string;
  total_price: number;
};

const BookingStatus: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showRatingPrompt, setShowRatingPrompt] = useState(false);
  const [completedBookingId, setCompletedBookingId] = useState<number | null>(null);

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

          // Check if there's a booking that just got completed
          const now = moment();
          const completedBooking = fetchedBookings.find(booking => 
            booking.booking_status === 'completed' && 
            moment(booking.booking_end_time).isBefore(now)
          );

          if (completedBooking) {
            setCompletedBookingId(completedBooking.id);
            setShowRatingPrompt(true);
          }
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
    <>
      <IonCard style={{ backgroundColor: '#1c1c1c', color: '#97FB57', borderRadius: '15px' }}>
        <IonCardHeader>
          <IonCardTitle style={{ color: '#97FB57' }}>Booking Status</IonCardTitle>
          <IonCardSubtitle style={{ color: '#97FB57' }}>
            {currentBooking ? "Here are the details of your current booking:" : "You have no active bookings."}
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          {currentBooking ? (
            <>
              <IonItem>
                <IonLabel style={{ color: '#97FB57' }}>
                  <h2><strong>Pitch:</strong> {currentBooking.turf.name}</h2>
                  <p><strong>Location:</strong> {currentBooking.turf.location}</p>
                  <p><strong>Date:</strong> {currentBooking.formatted_booking_date}</p>
                  <p><strong>Time:</strong> {currentBooking.formatted_booking_time}</p>
                  <p><strong>Status:</strong> {currentBooking.booking_status}</p>
                  <p><strong>Total Price:</strong> kshs {currentBooking.total_price.toFixed(2)}</p>
                </IonLabel>
              </IonItem>
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: animationData,
                  rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice',
                  },
                }}
                height={150}
                width={150}
              />
            </>
          ) : (
            <p style={{ color: '#97FB57' }}>Please make a booking to see the details here.</p>
          )}
        </IonCardContent>
      </IonCard>
      {showRatingPrompt && completedBookingId && (
        <RatingPrompt bookingId={completedBookingId} onClose={() => setShowRatingPrompt(false)} />
      )}
    </>
  );
};

export default BookingStatus;
