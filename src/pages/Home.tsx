import { IonButton, IonContent, IonDatetime, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
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

    try {
      const id = await insertTrip(newTrip)
      alert(id)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonTitle>Trip management!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          <IonList>
            {allTrips.map(c =>
              <IonItem key={c.id}>
                <IonThumbnail slot="start">
                  <IonImg src={c.picture} />
                </IonThumbnail>
                <IonLabel>
                  {c.name}
                  <IonLabel>Risk: {c.risk}</IonLabel>
                  <IonLabel>Description: {c.description}</IonLabel>
                  <IonLabel>Destination:{c.destination}</IonLabel>
                  <IonLabel>Vehicle:{c.vehicle}</IonLabel>
                  <IonLabel>Date: {c.date}</IonLabel>
                </IonLabel>
              </IonItem>
            )}
          </IonList>
      </IonContent>

    </IonPage>
  );
};

export default Home;
