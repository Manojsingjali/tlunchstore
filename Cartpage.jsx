import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const CartPage = ({ cart }) => {
  const [name, setName] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleOrder = async () => {
    if (!name || !screenshot || cart.length === 0) {
      setMessage("Please fill all fields and add products to cart.");
      return;
    }

    setLoading(true);
    try {
      const imageRef = ref(storage, `screenshots/${Date.now()}-${screenshot.name}`);
      await uploadBytes(imageRef, screenshot);
      const downloadURL = await getDownloadURL(imageRef);

      await addDoc(collection(db, "orders"), {
        name,
        cart,
        total,
        screenshot: downloadURL,
        createdAt: Timestamp.now()
      });

      setMessage("✅ Order submitted successfully!");
      setName('');
      setScreenshot(null);
    } catch (error) {
      console.error("Order error:", error);
      setMessage("❌ Failed to submit order.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul className="mb-4 space-y-2">
          {cart.map((item, index) => (
            <li key={index} className="bg-white shadow p-3 rounded-xl">
              {item.name} — Rs. {item.price}
            </li>
          ))}
        </ul>
      )}

      <p className="font-semibold mb-4">Total: Rs. {total}</p>

      <input
        type="text"
        placeholder="Your Name"
        className="w-full p-2 mb-3 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        className="w-full p-2 mb-3"
        onChange={(e) => setScreenshot(e.target.files[0])}
      />

      <button
        onClick={handleOrder}
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        {loading ? "Placing Order..." : "Submit Order"}
      </button>

      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
  );
};

export default CartPage;
