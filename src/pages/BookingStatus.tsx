import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Booking = {
    id: number;
    turf_id: number;
    pitch_number: number;
    booking_time: string;
    booking_end_time: string;
    booking_status: string;
};

const BookingStatus = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('/api/bookings');
                setBookings(response.data);
            } catch (err) {
                setError('Error fetching bookings');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleCancel = async (bookingId: number) => {
        try {
            await axios.post(`/api/booking/${bookingId}/cancel`);
            setBookings(bookings.filter(booking => booking.id !== bookingId));
        } catch (err) {
            setError('Error cancelling booking');
        }
    };

    const handleRating = async (bookingId: number, rating: number, review: string) => {
        try {
            await axios.post(`/api/booking/${bookingId}/rating`, { rating, review });
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

    return (
        <div>
            <h1>Your Bookings</h1>
            <ul>
                {bookings.map(booking => (
                    <li key={booking.id}>
                        <p>Turf: {booking.turf_id}</p>
                        <p>Pitch: {booking.pitch_number}</p>
                        <p>Time: {booking.booking_time} - {booking.booking_end_time}</p>
                        <p>Status: {booking.booking_status}</p>
                        {booking.booking_status === 'pending' && (
                            <button onClick={() => handleCancel(booking.id)}>Cancel Booking</button>
                        )}
                        {booking.booking_status === 'completed' && (
                            <button onClick={() => promptRating(booking)}>Rate Booking</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookingStatus;
