// src/components/OrderForm.jsx
import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

function OrderForm({ cart, clearCart }) {
  const [name, setName] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !screenshot) {
      alert('Please enter your name and upload payment screenshot.');
      return;
    }

    setLoading(true);
    try {
      // Upload screenshot to Firebase Storage
      const fileRef = ref(storage, `screenshots/${uuidv4()}`);
      await uploadBytes(fileRef, screenshot);
      const screenshotURL = await getDownloadURL(fileRef);

      // Save order in Firestore
      await addDoc(collection(db, 'orders'), {
        name,
        items: cart,
        total,
        screenshotURL,
        createdAt: serverTimestamp(),
      });

      alert('Order placed successfully!');
      clearCart();
      setName('');
      setScreenshot(null);
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Complete Your Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setScreenshot(e.target.files[0])}
          className="w-full"
          required
        />
        <p className="text-gray-700 font-semibold">Total: Rs. {total}</p>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit Order'}
        </button>
      </form>
    </div>
  );
}

export default OrderForm;
