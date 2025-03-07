import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AuthComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('signup');
  const [registeredName, setRegisteredName] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [registeredPassword, setRegisteredPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatchNotified, setPasswordMismatchNotified] = useState(false);

  const notify = (message) => toast.warning(message);
  const notifyLog = (message) => toast(message);

  const handleLogin = () => {
    if (email === registeredEmail && password !== registeredPassword) {
      setPassword('');
      notify('Invalid Password');
    } else if (email !== registeredEmail) {
      setEmail('');
      setPassword('');
      notify('Invalid Email Id');
    } else if (email === registeredEmail && password === registeredPassword) {
      setIsAuthenticated(true);
      notifyLog('Login Successful!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    notifyLog('Logged out successfully');
  };

  const handlePasswordMatch = () => {
    if (confirmPassword && registeredPassword !== confirmPassword && !passwordMismatchNotified) {
      notify('Passwords do not match');
      setPasswordMismatchNotified(true);
    } else if (registeredPassword === confirmPassword) {
      setPasswordMismatchNotified(false);
    }
  };

  const handleSignup = () => {
    if (!registeredName || !registeredEmail || !registeredPassword || !confirmPassword) {
      notify('Please fill all fields to sign up');
      return;
    }
    if (registeredPassword !== confirmPassword) {
      notify('Passwords do not match');
      return;
    }
    notifyLog('Sign up successful! Please log in.');
    setActiveTab('login');
  };

  const handleForgotPassword = () => {
    if (!email) {
      notify('Please enter your email to reset password');
      return;
    }
    if (email !== registeredEmail) {
      notify('Email not found');
      return;
    }
    notifyLog('Password reset link sent to your email');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 p-6 shadow-lg bg-white rounded-lg">
        {!isAuthenticated && (
          <div className="mb-4 flex justify-around">
            <button
              className={`px-4 py-2 ${activeTab === 'signup' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-lg`}
              onClick={() => setActiveTab('signup')}
            >
              Signup
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-lg`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
          </div>
        )}
        {isAuthenticated ? (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Welcome!</h2>
            <p className="mb-4">You are now logged in.</p>
            <button onClick={handleLogout} className="px-4 py-2 bg-blue-500 text-white rounded">Logout</button>
          </div>
        ) : activeTab === 'login' ? (
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 w-full p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 w-full p-2 border rounded"
            />
            <button onClick={handleLogin} className="w-full px-4 py-2 bg-blue-500 text-white rounded">
              Login
            </button>
            <button type="button" onClick={handleForgotPassword} className="w-full px-4 py-2 mt-2 bg-gray-200 text-blue-500 rounded">
              Forgot Password?
            </button>
          </form>
        ) : (
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Name"
              value={registeredName}
              onChange={(e) => setRegisteredName(e.target.value)}
              className="mb-4 w-full p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={registeredEmail}
              onChange={(e) => setRegisteredEmail(e.target.value)}
              className="mb-4 w-full p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={registeredPassword}
              onChange={(e) => setRegisteredPassword(e.target.value)}
              className="mb-4 w-full p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                handlePasswordMatch();
              }}
              className="mb-4 w-full p-2 border rounded"
            />
            <button onClick={handleSignup} className="w-full px-4 py-2 bg-blue-500 text-white rounded">
              Signup
            </button>
          </form>
        )}
      </div>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}
