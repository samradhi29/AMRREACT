import React, { useEffect } from 'react';
import axios from 'axios';

export default function ItemModal({ item, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleEnquire = async () => {
    try {
      await axios.post('https://amrreact-14.onrender.com/api/items/enquire', {
        itemId: item._id,
        name: item.name,
        type: item.type,
        description: item.description,
      });
      alert('Inquiry email sent!');
    } catch (error) {
      console.error('Failed to send enquiry:', error);
      alert('Failed to send enquiry.');
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 font-sans p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200 shadow-2xl rounded-2xl backdrop-blur-xl p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-red-600 text-3xl font-bold transition"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Main Content: Image Left, Details Right */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Cover Image */}
          <div className="md:flex-shrink-0 md:w-1/2">
            <img
              src={item.coverImage}
              alt="Cover"
              className="w-full h-auto max-h-96 object-cover rounded-xl border border-gray-300 shadow-md"
            />
          </div>

          {/* Details */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-4 text-gray-900">{item.name}</h2>
             
              <p className="text-gray-700 text-lg mb-2">
                <span className="font-semibold"> Type:</span> {item.type}
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-semibold">Description:</span> {item.description}
              </p>
            </div>

            <div className="mt-6 flex justify-start md:justify-end">
              <button
                onClick={handleEnquire}
                className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                Enquire 
              </button>
            </div>
          </div>
        </div>

        {/* Additional Images */}
        {item.additionalImages?.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Additional Images</h3>
            <div className="flex gap-4 overflow-x-auto pr-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
              {item.additionalImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Additional ${index}`}
                  className="h-52 w-52 object-cover rounded-xl border border-gray-300 transition-transform duration-300 hover:scale-105 flex-shrink-0"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
