// src/pages/Login.tsx
import {
    IonButton,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle
} from '@ionic/react';
import { logoGoogle, logoFacebook } from 'ionicons/icons';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebaseConfig';
import './Login.css';
import { useHistory } from 'react-router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log("result " + result)
            // Fetch user data after social login
            const user = result.user;
            if (user) {
                const userDetails = {
                    name: user.displayName || "Anonymous User",
                    email: user.email,
                    avatar: user.photoURL || "https://via.placeholder.com/100",
                };
                console.log("User details:", userDetails);
                // You can store this data in state or context
            }

            history.push('/home');
        } catch (err) {
            setError('Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider: any) => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            // Fetch user data after social login
            const user = result.user;
            if (user) {
                const userDetails = {
                    name: user.displayName || "Anonymous User",
                    email: user.email,
                    avatar: user.photoURL || "https://via.placeholder.com/100",
                };
                console.log("User details:", userDetails);
                // You can store this data in state or context
            }
            history.push('/home');
        } catch (err) {
            setError(`Login failed. Please try again.`);
            console.error('Auth error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="ion-text-center" style={{ color: '#ff385c', fontWeight: 'bold' }}>
                        Do it To
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <div className="auth-container auth-card">
                    <div className="auth-header">
                        <IonText color="primary">
                            <h1 className="ion-text-center">Sign in</h1>
                        </IonText>
                        <p className="ion-text-center">Sign in to continue</p>
                    </div>

                    {error && (
                        <div className="error-message ion-text-center">
                            <IonText color="danger">{error}</IonText>
                        </div>
                    )}

                    <div className="form-group">
                        <IonItem className="custom-input">
                            <IonLabel position="floating">Email</IonLabel>
                            <IonInput
                                type="email"
                                value={email}
                                onIonChange={(e) => setEmail(e.detail.value!)}
                            />
                        </IonItem>

                        <IonItem className="custom-input">
                            <IonLabel position="floating">Password</IonLabel>
                            <IonInput
                                type="password"
                                value={password}
                                onIonChange={(e) => setPassword(e.detail.value!)}
                            />
                        </IonItem>
                    </div>

                    <IonButton
                        expand="block"
                        onClick={handleLogin}
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </IonButton>

                    <div className="separator">
                        <span>OR</span>
                    </div>

                    <div className="social-buttons">
                        <IonButton
                            expand="block"
                            fill="outline"
                            onClick={() => handleSocialLogin(new GoogleAuthProvider())}
                            className="google-button"
                            disabled={loading}
                        >
                            <IonIcon slot="start" icon={logoGoogle} />
                            Login with Google
                        </IonButton>

                        <IonButton
                            expand="block"
                            fill="outline"
                            onClick={() => handleSocialLogin(new FacebookAuthProvider())}
                            className="facebook-button"
                            disabled={loading}
                        >
                            <IonIcon slot="start" icon={logoFacebook} />
                            Login with Facebook
                        </IonButton>
                    </div>

                    <div className="auth-footer ion-text-center">
                        <p>
                            Don't have an account?{' '}
                            <a href="/register" className="signup-link">Sign up</a>
                        </p>
                    </div>
                </div>
                {/* </IonCol> */}
                {/* </IonRow> */}
                {/* </IonGrid> */}
                {/* </div> */}
            </IonContent>
        </IonPage>
    );
};

export default Login;
