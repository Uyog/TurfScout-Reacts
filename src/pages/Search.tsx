import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonSearchbar, IonTitle } from '@ionic/react';

function Search() {
  return (
    <IonHeader>
      <IonToolbar color="black">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home" style={{ color: '#97FB57' }} /> {/* Use IonBackButton for navigation */}
        </IonButtons>
        <IonTitle style={{ color: '#97FB57' }}>Search</IonTitle>
      </IonToolbar>
      <IonToolbar>
        <IonSearchbar style={{ color: '#97FB57' }}></IonSearchbar>
      </IonToolbar>
    </IonHeader>
  );
}

export default Search;
