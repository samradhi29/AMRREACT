import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ItemModal from './Itemmodel';

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/items/getitems');
      setItems(res.data);
    } catch (err) {
      console.error('Failed to fetch items:', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="font-sans p-8 min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold text-pink-400 tracking-tight shadow-2xl">View Items</h2>
        <button
          onClick={() => navigate('/add')}
          className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 font-semibold"
        >
          + Add Item
        </button>
      </div>

      {/* Grid of Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
       {items.map((item) => (
  <div
    key={item._id}
    onClick={() => setSelectedItem(item)}
    className="cursor-pointer rounded-3xl shadow-md bg-white/90 backdrop-blur-lg transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl"
  >
    <div className="relative overflow-hidden rounded-t-3xl">
      <img
        src={item.coverImage}
        alt={item.name}
        className="w-full h-60 object-cover transition-transform duration-300 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-t-3xl pointer-events-none"></div>
    </div>
    <div className="p-5">
      <h4 className="text-xl font-bold text-gray-900 text-center">{item.name}</h4>
      <p className="text-sm text-pink-600 text-center mt-1 italic">{item.type}</p>
    </div>
  </div>
))}

      </div>

      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
