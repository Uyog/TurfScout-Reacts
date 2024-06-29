import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonLabel, IonList } from '@ionic/react';

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

const BookingHistory: React.FC = () => {
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

                // Sort bookings by booking_time in descending order (most recent first)
                const sortedBookings = response.data.sort((a: Booking, b: Booking) =>
                    new Date(b.formatted_booking_time).getTime() - new Date(a.formatted_booking_time).getTime()
                );

                setBookings(sortedBookings);
            } catch (err) {
                setError('Error fetching bookings');
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

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/profile" style={{ color: '#97FB57' }} />
                    </IonButtons>
                    <h1 style={{ textAlign: 'center', color: '#97FB57' }}>Booking History</h1>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {bookings
                        .filter(booking => booking.booking_status === 'completed' || booking.booking_status === 'rated' || booking.booking_status === 'cancelled')
                        .map(booking => (
                            <IonCard key={booking.id}>
                                <IonCardHeader>
                                    <IonCardTitle>{booking.turf?.name}</IonCardTitle>
                                    <IonCardSubtitle>{booking.turf?.location}</IonCardSubtitle>
                                    <IonCardSubtitle>{booking.formatted_booking_date}</IonCardSubtitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonItem>
                                        <IonLabel>
                                            <h2><strong>Pitch Number:</strong> {booking.pitch_number}</h2>
                                            <p><strong>Time:</strong> {booking.formatted_booking_time}</p>
                                            <p><strong>Status:</strong> {booking.booking_status}</p>
                                            <p><strong>Total Price:</strong> kshs {booking.total_price.toFixed(2)}</p>
                                        </IonLabel>
                                    </IonItem>
                                </IonCardContent>
                            </IonCard>
                        ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default BookingHistory;
