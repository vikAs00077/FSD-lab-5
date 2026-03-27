import { useState } from 'react';
import './index.css';

function App() {
  const [permission, setPermission] = useState(Notification.permission);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notifications.');
      return;
    }
    const result = await Notification.requestPermission();
    setPermission(result);
  };

  const showNotification = () => {
    if (permission === 'granted') {
      const notification = new Notification('Hello from React!', {
        body: 'This is a basic push notification using the Notification API.',
        icon: 'https://cdn-icons-png.flaticon.com/512/3119/3119338.png',
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    } else {
      alert('Notification permission not granted. Please request permission first.');
    }
  };

  return (
    <div className="container">
      <h1>Browser Notifications Demo</h1>
      <p>Current permission status: <strong>{permission}</strong></p>
      
      <div className="card">
        <p>
          First, request permission to show notifications. Once granted, you can trigger a notification.
        </p>
        <div className="button-group">
          <button 
            className="btn request-btn" 
            onClick={requestPermission}
            disabled={permission === 'granted' || permission === 'denied'}
          >
            Request Permission
          </button>
          
          <button 
            className="btn notify-btn" 
            onClick={showNotification}
            disabled={permission !== 'granted'}
          >
            Show Notification
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
