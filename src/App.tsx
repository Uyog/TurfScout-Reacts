import React, { useState, useEffect } from 'react';
import SplashScreen from '../src/pages/Splash';
import Auth from './pages/Auth';
import Home from './pages/Home';
import './components/Alert.css';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, home, search, settings, square, triangle } from 'ionicons/icons';
import Splash from './pages/Splash';
import AuthPage from './pages/Auth';
import LoginPage from './pages/Login';
import SignUp from './pages/SignUp';
import HomePage from './pages/Home';
import SearchPage from './pages/Search';
import SettingsPage from './pages/Settings';
import ProfilePage from './pages/Profile';
import TurfDetails from './pages/TurfDetails';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import BookingForm from './pages/BookingForm';
import RatingForm from './pages/RatingForm';

setupIonicReact();

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthenticated(!!token);
  }, []);

  const handleAuthentication = (isAuthenticated: boolean) => {
    setAuthenticated(isAuthenticated);
  };

  const handleAnimationComplete = () => {

    console.log('Animation completed');
  };

  return (
    <IonApp>
      {loading ? (
        <SplashScreen onAnimationComplete={handleAnimationComplete} />
      ) : (
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/auth" component={AuthPage} exact />
            <Route path="/home" component={HomePage} exact />
            <Route path="/search" component={SearchPage} exact />
            <Route path="/bookings/create" component={BookingForm} exact />
            <Route path="/bookings/:id/rating" component={RatingForm} exact />
            <Route path="/turfs/:id" component={TurfDetails} exact />
            <Route path="/profile" component={ProfilePage} exact />
            <Route path="/settings" component={SettingsPage} />
            <Route exact path="/">
              {authenticated ? <Redirect to="/home" /> : <Redirect to="/auth" />}
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      )}
    </IonApp>
  );
};

export default App;