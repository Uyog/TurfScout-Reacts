import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonSearchbar, IonButtons, IonBackButton } from '@ionic/react';
import Lottie from 'react-lottie';
import animationData from '../components/Loading2.json';
import axios from 'axios';
import { debounce } from 'lodash';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [turfs, setTurfs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const fetchTurfs = async (searchTerm: string) => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/turfs/search?search=${searchTerm}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status !== 200) {
          throw new Error(`Server returned ${response.status} ${response.statusText}`);
        }

        setTurfs(response.data);
        setError('');
      } catch (error) {
        setError('Error fetching turfs. Please try again later.');
        console.error('Error fetching turfs:', error);
      } finally {
        setLoading(false);
      }
    };

    const debouncedSearch = debounce(fetchTurfs, 300);

    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      setTurfs([]);
    }
  }, [searchTerm]);

  const handleInputChange = (e: CustomEvent) => {
    setSearchTerm(e.detail.value as string);
  };

  const handleTurfClick = (id: string) => {
    history.push(`/turfs/${id}`);
  };


  return (
    <>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Turf Search</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={searchTerm}
            onIonChange={handleInputChange}
            placeholder="Search by name or location"
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: animationData,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice'
                }
              }}
              height={150} 
              width={150} 
            />
          </div>
        )}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <IonList>
            {turfs.map(turf => (
              <IonItem key={turf.id} button onClick={() => handleTurfClick(turf.id)}>
                <IonLabel>
                  <h2>{turf.name}</h2>
                  <h3>{turf.location}</h3>
                  {/* Add more details as needed */}
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </>
  );
};

export default SearchPage;
