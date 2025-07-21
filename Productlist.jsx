import React from 'react';

// Example product list — you can replace this with Firebase or local data
const products = [
  {
    id: 1,
    name: "Classic Tlunch T-Shirt",
    description: "High-quality cotton t-shirt with Tlunch logo.",
    price: 799,
    image: "https://via.placeholder.com/300x200?text=Tlunch+T-Shirt"
  },
  {
    id: 2,
    name: "Tlunch Tote Bag",
    description: "Eco-friendly and stylish cotton tote bag.",
    price: 499,
    image: "https://via.placeholder.com/300x200?text=Tlunch+Tote"
  },
  {
    id: 3,
    name: "Limited Edition Hoodie",
    description: "Warm and comfy limited edition hoodie.",
    price: 1599,
    image: "https://via.placeholder.com/300x200?text=Tlunch+Hoodie"
  },
];

function ProductList({ addToCart }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{product.description}</p>
            <p className="text-blue-600 font-bold mt-2">Rs. {product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
