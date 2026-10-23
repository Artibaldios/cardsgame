import './App.css';
import Grid from './components/Grid/Grid';
import { useMediaQuery } from 'react-responsive';
import { Provider } from 'react-redux';
import store from './store';
import MobileGrid2 from './components/MobileGrid2/MobileGrid2';
import React, { useState, useEffect } from 'react';
import Loader from './components/Loader/Loader';
import { initialCards } from './initialData/data';

interface LoadingProgress {
  loaded: number;
  total: number;
}

const getScriptUrls = () => {
  const scriptUrls = new Set<string>();

  document.querySelectorAll<HTMLScriptElement>('script[src]').forEach((script) => {
    scriptUrls.add(script.src);
  });

  performance.getEntriesByType('resource').forEach((entry) => {
    const resource = entry as PerformanceResourceTiming;
    if (resource.initiatorType === 'script') {
      scriptUrls.add(resource.name);
    }
  });

  return Array.from(scriptUrls);
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState<LoadingProgress>({ loaded: 0, total: 1 });
  const isMobile = useMediaQuery({ maxWidth: 991});

  useEffect(() => {
    let isCancelled = false;
    const imageUrls = Array.from(new Set(initialCards.map((card) => card.imageSrc)));
    const scriptUrls = getScriptUrls();
    const totalResources = imageUrls.length + scriptUrls.length;
    let loadedResources = scriptUrls.length;

    const updateProgress = () => {
      if (isCancelled) return;

      setLoadingProgress({
        loaded: loadedResources,
        total: totalResources,
      });
    };

    const loadImage = (src: string) => new Promise<void>((resolve) => {
      const image = new Image();
      let hasFinished = false;
      const markAsLoaded = () => {
        if (hasFinished) return;
        hasFinished = true;
        loadedResources += 1;
        updateProgress();
        resolve();
      };

      image.onload = markAsLoaded;
      image.onerror = markAsLoaded;
      image.src = src;

      if (image.complete) {
        markAsLoaded();
      }
    });

    updateProgress();

    Promise.all(imageUrls.map(loadImage)).then(() => {
      if (!isCancelled) {
        setLoadingProgress({ loaded: totalResources, total: totalResources });
        setIsLoading(false);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  if (isLoading) {
    return <Loader loaded={loadingProgress.loaded} total={loadingProgress.total} />;
  }

  return (
    <Provider store={store}>
        {isMobile ? <MobileGrid2/>:<Grid/>}
    </Provider>
  );
};

export default App;