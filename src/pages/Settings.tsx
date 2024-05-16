import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonToggle, IonList, IonButtons, IonBackButton } from '@ionic/react';

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" style={{ color: '#97FB57' }} /> {/* Use IonBackButton for navigation */}
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Username</IonLabel>
            <IonInput placeholder="Enter your username"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput placeholder="Enter your email"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle slot="end" />
          </IonItem>
          <IonItem>
            <IonButton expand="block">Save Changes</IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
