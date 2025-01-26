import './App.css';
import Grid from './components/Grid/Grid';
import { useMediaQuery } from 'react-responsive';
import { Provider } from 'react-redux';
import store from './store';
import MobileGrid2 from './components/MobileGrid2/MobileGrid2';
import React, { useState, useEffect } from 'react';
import Loader from '../src/components/Loader/Loader'

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 991});

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Provider store={store}>
        {isMobile ? <MobileGrid2/>:<Grid/>}
    </Provider>
  );
};

export default App;