import { IonButton, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import { getAllTrips, insertTrip } from '../databaseHandler';
import { Trip } from '../models/Trip';
import './Home.css';

const Home: React.FC = () => {
  const [name, setName] = useState('')
  const [risk, setRisk] = useState('')
  const [destination, setDestination] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [picture, setPicture] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [allTrips, setAllTrips] = useState<Trip[]>([])

  const fetchData = async () => {
    const data = await getAllTrips()
    setAllTrips(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const saveHandler = async () => {
    const newTrip: Trip = { name: name, risk: risk, picture: picture, destination: destination, description: description, date: date, vehicle: vehicle}
    const id = await insertTrip(newTrip)
    alert(id)
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonTitle>Trip management!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel>Trip Name</IonLabel>
          <IonInput onIonChange={e => setName(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Destination</IonLabel>
          <IonInput onIonChange={e => setDestination(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Description</IonLabel>
          <IonInput onIonChange={e => setDescription(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Vehicle</IonLabel>
          <IonInput onIonChange={e => setVehicle(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Date</IonLabel>
          <IonDatetimeButton></IonDatetimeButton>
        </IonItem>
        <IonItem>
          <IonLabel>Language</IonLabel>
          <IonSelect multiple onIonChange={e => setRisk(e.detail.value!)}>
            <IonSelectOption value="Yes">Yes</IonSelectOption>
            <IonSelectOption value="No">No</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Picture</IonLabel>
          <IonInput onIonChange={e => setPicture(e.detail.value!)}></IonInput>
        </IonItem>
        <IonButton onClick={saveHandler} expand='block' class='ion-margin'>Save</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
