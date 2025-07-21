import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage('Please enter email and password');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('✅ Login successful!');
      navigate('/admin');
    } catch (error) {
      console.error('Login error:', error.message);
      setMessage('❌ Login failed. Check credentials.');
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto mt-10 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-center">🔐 Admin Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-3 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-3 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        Login
      </button>
      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
  );
};

export default LoginPage;
