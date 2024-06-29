import React, { useState, useEffect } from 'react';
import SplashScreen from '../src/pages/Splash';
import './components/Alert.css';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import AuthPage from './pages/Auth';
import HomePage from './pages/Home';
import SearchPage from './pages/Search';
import SettingsPage from './pages/Settings';
import ProfilePage from './pages/Profile';
import TurfDetails from './pages/TurfDetails';
import ForgotPassword from './pages/ForgotPassword';
import BookingForm from './pages/BookingForm';
import BookingStatus from './pages/BookingStatus';
import BookingHistory from './pages/BookingHistory';



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
import moment from 'moment';


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
            <Route path="/bookings" component={BookingStatus} exact />
            <Route path="/turfs/:id" component={TurfDetails} exact />
            <Route path="/profile" component={ProfilePage} exact />
            <Route path="/booking-history" component={BookingHistory} exact />
            <Route path="/settings" component={SettingsPage} />
            <Route path="/forgot-password" component={ForgotPassword} exact />
           
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