import React from 'react';
import { IonHeader, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';

function Example() {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle style={{ color: '#97FB57',}}>Toolbar</IonTitle>
      </IonToolbar>
      <IonToolbar>
        <IonSearchbar style={{ color: '#97FB57',}}></IonSearchbar>
      </IonToolbar>
    </IonHeader>
  );
}
export default Example;