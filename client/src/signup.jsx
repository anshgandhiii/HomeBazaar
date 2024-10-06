import { useState } from 'react';
import './App.css';

function Signup() {
  const [role, setRole] = useState('consumer'); // Default role
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [tc, setTc] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const url = 'http://127.0.0.1:8000/api/user/register/';
    const userData = {
      name: name,
      email: email,
      password: password,
      password2: password2,
      role: role, // Include role in the request
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // if (!response.ok) {
      //   alert("Signup unsuccessful");
      //   throw new Error('Network response was not ok');
      // }

      const data = await response.json();
      setSuccessMessage('Registration successful');
      console.log('Registration successful:', data);
      alert("Registration successful!");
      // Redirect or navigate after successful signup
      window.location.href="/login";

    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('There was a problem with the signup request');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="gradient-back flex justify-center items-center h-screen">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-10">
        <h2 className="text-2xl font-semibold text-base-content-800 mb-6">Create an Account</h2>
        
        <form onSubmit={handleSignup}>
          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-base-content-700">I am a:</label>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="consumer"
                checked={role === 'consumer'}
                onChange={() => setRole('consumer')}
                className="mr-2"
              />
              <span>Consumer</span>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                value="seller"
                checked={role === 'seller'}
                onChange={() => setRole('seller')}
                className="mr-2"
              />
              <span>Seller</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-base-content-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-1 border rounded-lg"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-base-content-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-1 border rounded-lg"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-base-content-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-1 border rounded-lg"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label className="block text-base-content-700">Confirm Password</label>
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="w-full px-3 py-1 border rounded-lg"
              required
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={tc}
              onChange={() => setTc(!tc)}
              className="mr-2"
              required
            />
            <label className="text-base-content-700">I agree to the terms and conditions</label>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-slate-950 text-white px-4 py-2 rounded mt-4"
            disabled={isLoading}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>

          {errorMessage && <p className="text-red-500 text-sm mt-4">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-sm mt-4">{successMessage}</p>}

          <div className="text-sm text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">Login here</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
