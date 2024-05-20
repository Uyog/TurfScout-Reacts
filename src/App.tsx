import React, { useState, useEffect } from 'react';
import SplashScreen from '../src/pages/Splash';
import Auth from './pages/Auth';
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
import HomePage from './pages/Home';
import SearchPage from './pages/Search';
import SettingsPage from './pages/Settings';

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

setupIonicReact();

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
      setLoading(false); // Set loading to false after 3 seconds (adjust as needed)
    }, 3000);
  }, []);

  const handleAnimationComplete = () => {
    // Handle animation complete event
    console.log('Animation completed');
  };

  return (
    <IonApp>
      {loading ? (
        <SplashScreen onAnimationComplete={handleAnimationComplete} /> // Pass the onAnimationComplete prop // Render the splash screen while loading
      ) : (
        <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/auth" component={AuthPage} exact/>
          <Route path="/home" component={HomePage} exact />
          <Route path="/search" component={SearchPage} exact />
          <Route path="/settings" component={SettingsPage} />
          <Redirect exact from="/" to="/auth" />
        </IonRouterOutlet>
      </IonReactRouter>
      )}
    </IonApp>
  );
};

export default App;