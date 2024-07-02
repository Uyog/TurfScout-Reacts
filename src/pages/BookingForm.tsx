import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { IonContent, IonLabel, IonItem, IonInput, IonText } from '@ionic/react';
import moment from 'moment';
import MyButton from '../components/Button';
import pitchImage from '../components/pitch.webp';

interface BookingFormProps {
  turfId: string;
  onClose: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ turfId, onClose }) => {
  const history = useHistory();
  const [pitch, setPitch] = useState<number | null>(null);
  const [bookingTime, setBookingTime] = useState<string>('');
  const [ball, setBall] = useState<number>(0);
  const [bib, setBib] = useState<number>(0);
  const [numPitches, setNumPitches] = useState<number>(1); 
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchTurfDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to fetch turf details!');
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/turfs/${turfId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setNumPitches(response.data.number_of_pitches);
      } catch (error) {
        console.error('Error fetching turf details:', error);
      }
    };

    fetchTurfDetails();
  }, [turfId]);

  const handleBooking = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to book a turf!');
      return;
    }

    if (pitch === null) {
      setError('Please select a pitch.');
      return;
    }

    try {
      const formattedBookingTime = moment(bookingTime, 'HH:mm').format('HH:mm');

      // Log state values to debug
      console.log('Pitch:', pitch);
      console.log('Booking Time:', formattedBookingTime);
      console.log('Ball:', ball);
      console.log('Bib:', bib);

      const response = await axios.post('http://127.0.0.1:8000/api/booking', {
        turf_id: turfId,
        booking_time: formattedBookingTime,
        ball: ball,
        bib: bib,
        pitch_number: pitch, 
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      onClose(); 
      history.push(`/home`);
    } catch (error: any) {
      console.error(error.response?.data);
      setError(error.response?.data?.error || 'Error creating booking. Please try again later.');
    }
  };

  const totalPrice = 2500 + (ball > 0 ? ball * 500 : 0) + (bib > 0 ? bib * 100 : 0);
  const pitchImageSrc = pitchImage;

  return (
    <>
      <IonContent style={{ overflowY: 'scroll' }}>
        <div style={{ padding: '20px' }}>
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
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <h2 style={{ color: '#97FB57' }}>Pick a pitch</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
              {Array.from({ length: numPitches }, (_, index) => (
                <div
                  key={index}
                  style={{
                    border: pitch === index + 1 ? '5px solid green' : '1px solid white',
                    padding: '10px',
                    cursor: 'pointer',
                    flexBasis: '30%', 
                    maxWidth: '30%', 
                    boxSizing: 'border-box', 
                    marginBottom: '20px',
                    position: 'relative', 
                  }}
                  onClick={() => setPitch(index + 1)}
                >
                  <img src={pitchImageSrc} alt={`Pitch ${index + 1}`} width="100" />
                  <div
                    style={{
                      position: 'absolute',
                      top: '5px',
                      left: '5px',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      padding: '5px',
                      borderRadius: '5px',
                      fontSize: '12px',
                    }}
                  >
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <IonItem>
            <IonLabel position="stacked">Ball</IonLabel>
            <IonInput type="number" value={ball} onIonChange={(e) => setBall(parseInt(e.detail.value!, 10))} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Bib</IonLabel>
            <IonInput type="number" value={bib} onIonChange={(e) => setBib(parseInt(e.detail.value!, 10))} />
          </IonItem>
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <h3 style={{ color: '#97FB57' }}>Total Price: kshs {totalPrice}</h3>
            <MyButton text="Create Booking" onClick={handleBooking} />
          </div>
        </div>
      </IonContent>
    </>
  );
};

export default BookingForm;
