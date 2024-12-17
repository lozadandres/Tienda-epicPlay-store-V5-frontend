import { useEffect } from 'react';

function WarningSection({ isLoggedIn }) {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isLoggedIn) {
        event.preventDefault();
        
        event.returnValue = '¿Estás seguro de que deseas salir de esta página?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup del evento al desmontar el componente
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isLoggedIn]);

  return null;
}

export default WarningSection;
