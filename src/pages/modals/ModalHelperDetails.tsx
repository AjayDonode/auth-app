import React from 'react';
import { close } from 'ionicons/icons';
import {
    IonModal,
    IonButton,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonCard,
    IonAvatar,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonContent,
    IonIcon
} from '@ionic/react';
import './ModalHelperDetails.css';

interface ModalHelperDetailsProps {
    isOpen: boolean;
    onDidDismiss: () => void;
    helper: any;
}

const ModalHelperDetails: React.FC<ModalHelperDetailsProps> = ({
    isOpen,
    onDidDismiss,
    helper
}) => {
    if (!helper) return null;

    const confirm = () => {
        onDidDismiss();
    };

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss} className="no-padding-modal">
            <IonHeader>
                <IonToolbar>
                    {/* <IonButtons slot="start">
                        <IonButton onClick={onDidDismiss}>Cancel</IonButton>
                    </IonButtons> */}
                    {/* {helper.name} */}
                    <IonButtons slot="end">
                    <IonButton onClick={onDidDismiss} shape="round" color="medium" fill="clear" className="close-btn">
  <IonIcon icon={close} />
</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="no-padding-content">
                <IonCard className="no-padding-card">
                    <div className="banner-avatar-container">
                        <img
                            className="modal-banner"
                            src={helper.banner}
                            alt="Banner"
                        />
                        <IonAvatar className="modal-avatar">
                            <img src={helper.avatar} alt="Avatar" />
                        </IonAvatar>
                    </div>
                    <IonCardContent className="no-padding-card-content">
                        <div style={{ textAlign: 'center', marginTop: 48 }}>
                            <IonCardTitle style={{ marginTop: 8 }}>{helper.name}</IonCardTitle>
                        </div>
                        <div className="modal-info">
                            <p>{helper.info}</p>
                        </div>
                        <div className="modal-reviews">
                            <h3 style={{ marginTop: 0 }}>Reviews</h3>
                            <IonList>
                                {helper.reviews.map((review: any, idx: number) => (
                                    <IonCard key={idx} className="review-card" style={{ marginBottom: 8 }}>
                                        <IonCardContent>
                                            <strong>{review.user}:</strong> {review.comment}
                                            <span style={{ color: '#ffb400', marginLeft: 8 }}>★ {review.rating}</span>
                                        </IonCardContent>
                                    </IonCard>
                                ))}
                            </IonList>
                        </div>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonModal>
    );
};

export default ModalHelperDetails;
