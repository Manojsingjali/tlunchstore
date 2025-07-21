import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">🛒 Admin - Orders</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-xl shadow">
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Total:</strong> Rs. {order.total}</p>
              <ul className="list-disc list-inside ml-4">
                {order.cart.map((item, index) => (
                  <li key={index}>{item.name} — Rs. {item.price}</li>
                ))}
              </ul>
              <a
                href={order.screenshot}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-blue-600 underline"
              >
                View eSewa Screenshot
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
