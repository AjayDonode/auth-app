import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonButton, IonGrid, IonRow, IonCol, IonIcon, IonPopover, IonList, IonItem, IonLabel, IonModal, IonCard, IonImg, IonCardContent } from '@ionic/react';
import { locationOutline, calendarOutline, personOutline, personCircleOutline } from 'ionicons/icons';
import './Home.css';
import { useHistory } from 'react-router';
import ModalHelperDetails from './modals/ModalHelperDetails';

const Home: React.FC = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const history = useHistory();

  const [selectedHelper, setSelectedHelper] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const helpers = [...Array(8)].map((_, i) => ({
    id: i,
    name: `Helper Name ${i + 1}`,
    avatar: `https://i.pravatar.cc/100?img=${i + 10}`,
    banner: `https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80`,
    info: "This is some detailed info about the helper. They are experienced and friendly!",
    reviews: [
      { user: "Alice", comment: "Very helpful!", rating: 5 },
      { user: "Bob", comment: "Would recommend.", rating: 4 }
    ]
  }));


  function navigateToPage(link: string): void {
    setIsPopoverOpen(false)
    history.push('/' + link);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center" style={{ color: '#ff385c', fontWeight: 'bold' }}>
            SearchWork
          </IonTitle>

          <div slot="end" className="header-buttons">
            <IonButton className="offer-help-button" shape="round" fill="outline" color="dark"
              onClick={() => navigateToPage('register')}>
              Offer Help
            </IonButton>
            <IonButton
              className="user-button"
              id="user-popover"
              fill="clear"
              onClick={() => setIsPopoverOpen(true)}
            >
              <IonIcon icon={personCircleOutline} size="large" />
            </IonButton>
            <IonPopover
              trigger="user-popover"
              isOpen={isPopoverOpen}
              onDidDismiss={() => setIsPopoverOpen(false)}
            >
              <IonContent class="ion-padding">
                <IonList>
                  <IonItem button onClick={() => navigateToPage('login')}>
                    <IonLabel>Login</IonLabel>
                  </IonItem>
                  <IonItem button onClick={() => setIsPopoverOpen(false)}>
                    <IonLabel>Sign Up</IonLabel>
                  </IonItem>
                  <IonItem button onClick={() => setIsPopoverOpen(false)}>
                    <IonLabel>Profile</IonLabel>
                  </IonItem>
                  <IonItem button onClick={() => setIsPopoverOpen(false)}>
                    <IonLabel>Settings</IonLabel>
                  </IonItem>
                  <IonItem button onClick={() => setIsPopoverOpen(false)}>
                    <IonLabel>Logout</IonLabel>
                  </IonItem>
                </IonList>
              </IonContent>
            </IonPopover>
          </div>

        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="hero-section">
          <h1>Get help</h1>
          <p>Search people who can help</p>
        </div>

        <div className="search-container">
          <IonGrid className="search-grid">
            <IonRow className="search-row">
              <IonCol size="12" sizeMd="4" className="search-col">
                <div className="search-field">
                  <IonIcon icon={personOutline} className="search-icon" />
                  <IonSearchbar placeholder="What is your project" className="custom-searchbar" />
                </div>
              </IonCol>
              <IonCol size="12" sizeMd="2.5" className="search-col">
                <div className="search-field">
                  <IonIcon icon={calendarOutline} className="search-icon" />
                  <IonSearchbar placeholder="Start date" className="custom-searchbar" />
                </div>
              </IonCol>
              <IonCol size="12" sizeMd="2.5" className="search-col">
                <div className="search-field">
                  <IonIcon icon={calendarOutline} className="search-icon" />
                  <IonSearchbar placeholder="Check-out" className="custom-searchbar" />
                </div>
              </IonCol>
              <IonCol size="12" sizeMd="3" className="search-col search-button-col">
                <IonButton expand="block" color="danger" className="search-button">
                  Search
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>


        <div className="card-section">
          <h2>Popular Helpers</h2>
          <div className="helper-grid">
            {helpers.map((helper) => (
              <IonCard
                className="helper-card"
                key={helper.id}
                button
                onClick={() => {
                  setSelectedHelper(helper);
                  setIsModalOpen(true);
                }}
              >
                <IonImg src={helper.avatar} alt="Helper" className="card-img" />
                <IonCardContent className="card-body">
                  <h3>{helper.name}</h3>
                  <p>{helper.info.slice(0, 40)}...</p>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        </div>

        <ModalHelperDetails
          isOpen={isModalOpen}
          onDidDismiss={() => setIsModalOpen(false)}
          helper={selectedHelper}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
