import { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();  // Prevent default form submission
        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        const url = 'http://127.0.0.1:8000/api/user/login/';
        const userData = {
            email,
            password
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
                alert("Login unsuccessful");
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setSuccessMessage('Login successful');
            console.log('Login successful:', data);
            alert("Login successful!");

            // Store user data in localStorage
            const userInfo = {
                email: data.email,
                // role: data.role // Assuming API returns role as 'seller' or 'customer'
            };
            localStorage.setItem('user', JSON.stringify(userInfo));
            // Redirect to home page
            window.location.href = "/vendor/home";

        } catch (error) {
            setErrorMessage('There was a problem with the login request');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="gradient-back flex justify-center items-center h-screen">
            <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login to your account</h2>

                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

                <form onSubmit={handleLogin}>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-1 border rounded-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-1 border rounded-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="m-2">Remember me</span>
                        </label>
                        <a href="/forgot-password" className="text-sm text-blue-500">Forgot Password?</a>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-slate-950 text-white px-4 py-2 rounded mt-4"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="text-sm text-center mt-4">
                    Don’t have an account?{" "}
                    <a href="/signup" className="text-blue-500">Sign up here</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
