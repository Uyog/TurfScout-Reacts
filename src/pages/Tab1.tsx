import React, { useState, useEffect } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonAvatar } from '@ionic/react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonGrid, IonRow, IonCol } from '@ionic/react';

import './Tab1.css';

interface ExampleCardProps {
  userData: {
    id: number;
    title: string;
    subtitle: string;
    content: string;
  };
}

const Example: React.FC = () => {
  const [userName, setUserName] = useState<string>(""); // Declare userName state

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
                <ExampleCard userData={{ id: 1, title: 'Arena One', subtitle: 'Galleria', content: 'Card Content 1' }} />
              </IonCol>
              <IonCol>
                <ExampleCard userData={{ id: 2, title: 'Freedom Heights', subtitle: 'Langata', content: 'Card Content 2' }} />
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
        </IonContent>
      </IonPage>
    </>
  );
};

const ExampleCard: React.FC<ExampleCardProps> = ({ userData }) => (
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

export default Example;
