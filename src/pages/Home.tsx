import React, { useState, useEffect } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonGrid, IonRow, IonCol, IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react';
import { add, people, person, search, settings } from 'ionicons/icons';
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation

interface ExampleCardProps {
  userData: {
    id: number;
    title: string;
    subtitle: string;
    content: string;
  };
}

const HomePage: React.FC = () => {
  const [userName, setUserName] = useState<string>(""); // Declare userName state
  const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    // Set userName from arguments
    setUserName("Username"); // Change this to retrieve username from your authentication state
  }, []);

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar color="black">
            <IonTitle style={{ color: '#97FB57',}}>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">P R O FI I L E</IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton style={{ color: '#97FB57',}}></IonMenuButton>
            </IonButtons>
            <IonTitle style={{ color: '#97FB57',}}>TurfScout</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard color="dark" style={{ backgroundColor: 'black' }}>
            <IonCardHeader></IonCardHeader>
            <IonCardContent>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#97FB57', fontWeight: 'bold', fontSize: 20, marginLeft: 20 }}>Welcome {userName}</span>
              </div>
            </IonCardContent>
            <h4 style={{ color: '#97FB57', fontWeight: 'bold', fontSize: 15, marginLeft: 20 }}>Book A Turf Today!</h4>
          </IonCard>
          <h2 style={{ color: '#97FB57', fontWeight: 'bold', fontSize: 25, marginLeft: 20 }}>Best Turfs</h2>
          <IonGrid>
            <IonRow>
              <IonCol>
                <MyCard userData={{ id: 1, title: 'Arena One', subtitle: 'Galleria', content: 'Card Content 1' }} />
              </IonCol>
              <IonCol>
                <MyCard userData={{ id: 2, title: 'Freedom Heights', subtitle: 'Langata', content: 'Card Content 2' }} />
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonCard style={{ backgroundColor: 'black' }}>
            <IonCardHeader>
              <IonCardTitle style={{ color: '#97FB57',}}>Top Rated Creators</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonRow>
                <IonCol size="4">
                  <IonAvatar>
                    <img src="https://via.placeholder.com/150" alt="Avatar" />
                  </IonAvatar>
                  <p style={{ color: '#97FB57',}}>John Doe</p>
                </IonCol>
                <IonCol size="4">
                  <IonAvatar>
                    <img src="https://via.placeholder.com/150" alt="Avatar" />
                  </IonAvatar>
                  <p style={{ color: '#97FB57',}}>Jane Smith</p>
                </IonCol>
                <IonCol size="4">
                  <IonAvatar>
                    <img src="https://via.placeholder.com/150" alt="Avatar" />
                  </IonAvatar>
                  <p style={{ color: '#97FB57',}}>Michael Johnson</p>
                </IonCol>
              </IonRow>
            </IonCardContent>
          </IonCard>
          <FabButton history={history} /> {/* Pass history to FabButton */}
        </IonContent>
      </IonPage>
    </>
  );
};

const MyCard: React.FC<ExampleCardProps> = ({ userData }) => (
  <IonCard style={{ maxWidth: '300px', margin: '0 auto', backgroundColor: 'black' }}>
    <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
    <IonCardHeader>
      <IonCardTitle style={{ fontSize: 'clamp(12px, 3vw, 24px)', color: '#97FB57' }}>{userData.title}</IonCardTitle>
      <IonCardSubtitle style={{ fontSize: 'clamp(10px, 2.5vw, 20px)', color: '#97FB57' }}>{userData.subtitle}</IonCardSubtitle>
    </IonCardHeader>
    <IonCardContent style={{ fontSize: 'clamp(10px, 2vw, 16px)', color: '#97FB57' }}>
      <p>{userData.content}</p>
      <IonButton expand="full" color="primary">Book</IonButton>
    </IonCardContent>
  </IonCard>
);

interface FabButtonProps {
  history: any; // Define history prop
}

const FabButton: React.FC<FabButtonProps> = ({ history }) => (
  <IonFab vertical="bottom" horizontal="end" style={{ marginBottom: '20px', marginRight: '20px', position: 'fixed', zIndex: '9999' }}>
    <IonFabButton>
      <IonIcon icon={add}></IonIcon>
    </IonFabButton>
    <IonFabList side="start">
      <IonFabButton onClick={() => history.push('/search')}> {/* Use history.push for navigation */}
        <IonIcon icon={search}></IonIcon>
      </IonFabButton>
      <IonFabButton onClick={() => history.push('/profile')}> {/* Use history.push for navigation */}
        <IonIcon icon={people}></IonIcon>
      </IonFabButton>
      <IonFabButton onClick={() => history.push('/settings')}> {/* Use history.push for navigation */}
        <IonIcon icon={settings}></IonIcon>
      </IonFabButton>
    </IonFabList>
  </IonFab>
);

export default HomePage;
