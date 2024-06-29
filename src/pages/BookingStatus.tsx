import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Booking = {
    id: number;
    turf_id: number;
    turf_name: string;
    pitch_number: number;
    booking_time: string;
    booking_end_time: string;
    booking_date: string;
    booking_status: string;
};

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
                setBookings(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                setError('Error fetching bookings');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleCancel = async (bookingId: number) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('You must be logged in to cancel a booking!');
            return;
        }

        try {
            await axios.post(`http://127.0.0.1:8000/api/booking/${bookingId}/cancel`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setBookings(bookings.filter(booking => booking.id !== bookingId));
        } catch (err) {
            setError('Error cancelling booking');
        }
    };

    const handleRating = async (bookingId: number, rating: number, review: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('You must be logged in to rate a booking!');
            return;
        }

        try {
            await axios.post(`http://127.0.0.1:8000/api/booking/${bookingId}/rating`, { rating, review }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setBookings(bookings.map(booking =>
                booking.id === bookingId ? { ...booking, booking_status: 'rated' } : booking
            ));
            alert('Rating submitted successfully');
        } catch (err) {
            setError('Error submitting rating');
        }
    };

    const promptRating = (booking: Booking) => {
        const rating = parseInt(prompt('Please rate the turf (1-5):') || '0', 10);
        const review = prompt('Please leave a review (optional):');
        if (rating >= 1 && rating <= 5) {
            handleRating(booking.id, rating, review || '');
        } else {
            alert('Invalid rating');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const currentBooking = bookings
        .filter(booking => booking.booking_status === 'pending' || booking.booking_status === 'in progress')
        .sort((a, b) => new Date(b.booking_time).getTime() - new Date(a.booking_time).getTime())[0];

    return (
        <div>
            <h1>Current Booking</h1>
            {currentBooking ? (
                <div key={currentBooking.id}>
                    <p><strong>Turf:</strong> {currentBooking.turf_name} (ID: {currentBooking.turf_id})</p>
                    <p><strong>Pitch:</strong> {currentBooking.pitch_number}</p>
                    <p><strong>Date:</strong> {currentBooking.booking_date}</p>
                    <p><strong>Time:</strong> {currentBooking.booking_time} - {currentBooking.booking_end_time}</p>
                    <p><strong>Status:</strong> {currentBooking.booking_status}</p>
                    {currentBooking.booking_status === 'pending' && (
                        <button onClick={() => handleCancel(currentBooking.id)}>Cancel Booking</button>
                    )}
                    {currentBooking.booking_status === 'in progress' && (
                        <button onClick={() => promptRating(currentBooking)}>Rate Booking</button>
                    )}
                </div>
            ) : (
                <p>No current bookings.</p>
            )}
        </div>
    );
};

export default BookingStatus;
