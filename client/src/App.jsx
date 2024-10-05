import { useState } from 'react';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [errorMessage, setErrorMessage] = useState(''); // Track error message
  const [successMessage, setSuccessMessage] = useState(''); // Track success message

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    const url = 'http://127.0.0.1:8000/api/user/login/';
    const userData = {
      name: "d",
      email: "kkkdk@examp.com",
      password: "123@321",
      password2: "123@321",
      tc: "True"
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSuccessMessage('Login successful');
      console.log('Login successful:', data);

    } catch (error) {
      setErrorMessage('There was a problem with the login request');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>Open Modal</button>
      <button className="btn" onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login user'}
      </button>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click the button below to close</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </>
  );
}

export default App;
