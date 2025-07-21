import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

import ProductList from './components/ProductList';
import CartPage from './components/CartPage';
import AdminPage from './components/AdminPage';
import LoginPage from './components/LoginPage';

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false); // to prevent flicker on page load

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  if (!authChecked) {
    // Optional: show loading while auth state is being checked
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        {/* Navigation */}
        <nav className="flex justify-between items-center bg-white shadow px-6 py-4 rounded-lg mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Tlunch</h1>
          <div className="flex gap-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-black">Home</Link>
            <Link to="/cart" className="hover:text-black">
              Cart ({cart.length})
            </Link>
            {user ? (
              <>
                <Link to="/admin" className="hover:text-black">Admin</Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:text-black">Login</Link>
            )}
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<ProductList addToCart={(product) => setCart(prev => [...prev, product])} />} />
          <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
          <Route
            path="/admin"
            element={user ? <AdminPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/admin" replace /> : <LoginPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
