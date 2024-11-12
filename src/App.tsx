import { useEffect, useState } from 'react';
import HomePage from './pages/homePage';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000); 

        return () => clearTimeout(timeout); 
    }, []);

    if (isLoading) {
        return (
          <div className='w-full h-full flex justify-center items-center'>
            <LoadingSpinner />
          </div>
      ); 
    }

  return (
    <HomePage />
  );
}

export default App;