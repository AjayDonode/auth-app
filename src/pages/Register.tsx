// src/pages/Register.tsx
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebaseConfig';
import './Register.css';
import { useHistory } from 'react-router';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      history.push('/home');
    } catch (err) {
      console.log(err)
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center" style={{ color: '#ff385c', fontWeight: 'bold' }}>
            SearchWork
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="auth-container auth-card">

          <div className="auth-header">
            <IonText color="primary">
              <h1 className="ion-text-center">Register</h1>
            </IonText>
            <p className="ion-text-center">Register new user</p>
          </div>

          {error && (
            <div className="error-message ion-text-center">
              <IonText color="danger">{error}</IonText>
            </div>
          )}
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Confirm Password</IonLabel>
            <IonInput
              type="password"
              value={confirmPassword}
              onIonChange={(e) => setConfirmPassword(e.detail.value!)}
            />
          </IonItem>
          <IonButton
            expand="block"
            onClick={handleRegister}
            className="auth-button"
          >
            Register
          </IonButton>
          <p className="auth-footer">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
