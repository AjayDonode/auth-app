// src/App.tsx
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useHistory, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';

setupIonicReact();

const PrivateRoute: React.FC<{ component: React.ComponentType }> = ({
  component: Component
}) => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const location = useLocation();

  if (!currentUser) {
    history.replace('/login', { from: location });
    return null;
  }

  return <Component />;
};

// Usage in routes:

const App: React.FC = () => {
  return (
    <IonApp>
      <AuthProvider>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/profile" component={Profile} />
          </IonRouterOutlet>
        </IonReactRouter>
      </AuthProvider>
    </IonApp>
  );
};

export default App;
