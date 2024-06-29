import React, { useState, useEffect } from 'react';
import { IonFooter, IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, IonCardHeader, IonIcon, IonFabButton, IonFab, IonFabList } from '@ionic/react';
import { add, search, person, settings, time } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../components/Creator.json';
import { Redirect } from 'react-router-dom';
import BookingStatus from './BookingStatus';
import './Home.css';

interface User {
  id: number;
  name: string;
  email: string;
}

interface HomePageProps {
  authenticated: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ authenticated }) => {
  const [userName, setUserName] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [hasBookedTurf, setHasBookedTurf] = useState<boolean>(false);
  const [showBookingStatus, setShowBookingStatus] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserName(userData.name);

          const bookingResponse = await fetch('http://127.0.0.1:8000/api/bookings', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          if (bookingResponse.ok) {
            const bookings = await bookingResponse.json();
            const hasActiveBooking = bookings.some((booking: any) => booking.booking_status === 'pending' || booking.booking_status === 'in progress');
            setHasBookedTurf(hasActiveBooking);
          }
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (hasBookedTurf) {
      const interval = setInterval(() => {
        const token = localStorage.getItem('token');
        fetch('http://127.0.0.1:8000/api/bookings', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then(response => response.json())
        .then(bookings => {
          const hasActiveBooking = bookings.some((booking: any) => booking.booking_status === 'pending' || booking.booking_status === 'in progress');
          setHasBookedTurf(hasActiveBooking);
        })
        .catch(error => console.error('Failed to fetch booking data:', error));
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [hasBookedTurf]);

  const handleLogout = async () => {
    try {
      console.log('Logging out...');

      const token = localStorage.getItem('token');
      console.log('Token before removal:', token);

      const response = await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Logged out successfully');
        localStorage.removeItem('token');
        console.log('Token removed');
        window.location.href = '/auth';
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
    if (!authenticated) {
      return <Redirect to="/" />;
    }
  };

  const handleIconClick = () => {
    setShowBookingStatus(!showBookingStatus);
  };

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar color="black">
            <IonTitle style={{ color: '#97FB57' }}>TurfScout</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding"></IonContent>
        <IonFooter>
          <IonToolbar>
            <IonButton
              color="light"
              expand="full"
              onClick={handleLogout}
              style={{ backgroundColor: '#97FB57', color: 'black', fontWeight: 'bold', '--ion-color-light': '#97FB57', '--ion-color-light-contrast': 'black' }}
            >
              Logout
            </IonButton>
          </IonToolbar>
        </IonFooter>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton style={{ color: '#97FB57' }}></IonMenuButton>
            </IonButtons>
            <IonTitle style={{ color: '#97FB57' }}>TurfScout</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className={`card-container ${showBookingStatus ? 'flipped' : ''}`} onClick={handleIconClick}>
            <IonCard color="dark" className="flippable-card" style={{ backgroundColor: '#1c1c1c', borderRadius: '15px'}}>
              <IonCardHeader></IonCardHeader>
              <IonCardContent>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                  <span style={{ color: '#97FB57', fontWeight: 'bold', fontSize: 30, marginLeft: 40 }}>
                    Welcome {userName}!
                  </span>
                  <IonButton className={`icon-button ${hasBookedTurf ? 'flashing-icon' : ''}`} style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                    <IonIcon icon={time} style={{ color: '#97FB57' }} />
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
            <IonCard color="dark" className="flippable-card" style={{ backgroundColor: '#1c1c1c', borderRadius: '15px', padding: '20px' }}>
              <IonCardHeader></IonCardHeader>
              <IonCardContent>
                <BookingStatus />
              </IonCardContent>
            </IonCard>
          </div>
          <FabButton history={history} />
        </IonContent>
      </IonPage>
    </>
  );
};

interface FabButtonProps {
  history: any;
}

const FabButton: React.FC<FabButtonProps> = ({ history }) => (
  <IonFab vertical="bottom" horizontal="end" style={{ marginBottom: '20px', marginRight: '20px', position: 'fixed', zIndex: '9999' }}>
    <IonFabButton>
      <IonIcon icon={add}></IonIcon>
    </IonFabButton>
    <IonFabList side="start">
      <IonFabButton onClick={() => history.push('/search')}>
        <IonIcon icon={search}></IonIcon>
      </IonFabButton>
      <IonFabButton onClick={() => history.push('/profile')}>
        <IonIcon icon={person}></IonIcon>
      </IonFabButton>
      <IonFabButton onClick={() => history.push('/settings')}>
        <IonIcon icon={settings}></IonIcon>
      </IonFabButton>
    </IonFabList>
  </IonFab>
);

export default HomePage;
