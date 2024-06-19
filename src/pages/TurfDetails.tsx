import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonLabel, IonItem, IonModal, IonButton } from '@ionic/react';
import axios from 'axios';
import BookingForm from './BookingForm';
import MyButton from '../components/Button';
import './TurfDetails.css';

const TurfDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [turf, setTurf] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [bookingAllowed, setBookingAllowed] = useState<boolean>(false);
  const [ratingAllowed, setRatingAllowed] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchTurf = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/turfs/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setTurf(response.data);
        setError('');
        const currentTime = new Date();
        const turfEndTime = new Date(response.data.end_time);
        setBookingAllowed(currentTime > turfEndTime);
        if (response.data.booking_status === 'completed') {
          setRatingAllowed(true);
        }
      } catch (error) {
        setError('Error fetching turf details. Please try again later.');
        console.error('Error fetching turf details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTurf();
  }, [id]);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Error loading image', event);
    (event.target as HTMLImageElement).src = '/assets/default-image.jpg';
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/search" />
          </IonButtons>
          <IonTitle>{turf ? turf.name : 'Loading...'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {turf && (
          <>
            <IonItem className="turf-item">
              <IonLabel>
                <img 
                  src={`http://127.0.0.1:8000${turf.image_url}`} 
                  alt={turf.name} 
                  onError={handleImageError} 
                  className="turf-image"
                />
                <div className="turf-details-header">
                  <h2>{turf.name}</h2>
                  <span className="turf-price">kshs {turf.price}</span>
                </div>
                <h3>{turf.location}</h3>
                <p>{turf.description}</p>
                <MyButton text="Book Now" onClick={() => setShowModal(true)} />
              </IonLabel>
            </IonItem>
         
            <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
              <IonHeader>
                <IonToolbar>
                  <IonTitle  style={{ color: '#97FB57',}}>Book Turf</IonTitle>
                  <IonButtons slot="end">
                    <IonButton   style={{ color: '#97FB57',}} onClick={() => setShowModal(false)}>Close</IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <IonContent>
                <BookingForm turfId={id} onClose={() => setShowModal(false)} />
              </IonContent>
            </IonModal>
          </>
        )}
      </IonContent>
    </>
  );
};

export default TurfDetails;