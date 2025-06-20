import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
export default function AddItems() {
  const [name, setName] = useState('');
  const [type, setType] = useState('Shirt');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [message, setMessage] = useState('');

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = additionalImages.length + files.length;
    
    if (totalImages > 10) {
      alert('You can upload up to 10 additional images only.');
      return;
    }
    
    // Add new files to existing ones
    setAdditionalImages(prev => [...prev, ...files]);
  };

  const removeAdditionalImage = (indexToRemove) => {
    setAdditionalImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const removeCoverImage = () => {
    setCoverImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    formData.append('description', description);

    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    additionalImages.forEach((file) => {
      formData.append('additionalImages', file);
    });

    try {
      
      const res = await axios.post('https://amrreact.onrender.com/api/items/additems', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

   
      setMessage('Item successfully added');

      
      setName('');
      setType('Shirt');
      setDescription('');
      setCoverImage(null);
      setAdditionalImages([]);
    } catch (err) {
      console.error(err);
      setMessage('Error adding item');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Add Item</h2>
      <div className="space-y-6">
        <div>
          <label className="block mb-1 font-medium text-gray-700" htmlFor="name">
            Item Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700" htmlFor="type">
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Shirt">Shirt</option>
            <option value="Pant">Pant</option>
            <option value="Shoes">Shoes</option>
            <option value="Sports Gear">Sports Gear</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter item description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700" htmlFor="coverImage">
            Cover Image
          </label>
          <input
            id="coverImage"
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            required
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {/* Cover Image Preview */}
          {coverImage && (
            <div className="mt-3 relative inline-block">
              <img
                src={URL.createObjectURL(coverImage)}
                alt="Cover Preview"
                className="h-32 w-32 object-cover rounded-lg border-2 border-gray-200"
              />
              <button
                type="button"
                onClick={removeCoverImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700" htmlFor="additionalImages">
            Additional Images ({additionalImages.length}/10)
          </label>
          <input
            id="additionalImages"
            type="file"
            accept="image/*"
            multiple
            onChange={handleAdditionalImagesChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
          <p className="text-xs text-gray-500 mt-1">
            You can select multiple images at once. Maximum 10 images allowed.
          </p>
          
          {/* Additional Images Preview */}
          {additionalImages.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Preview:</h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {additionalImages.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Additional Preview ${index + 1}`}
                      className="h-20 w-20 object-cover rounded-lg border-2 border-gray-200 group-hover:opacity-75 transition-opacity"
                    />
                    <button
                      type="button"
                      onClick={() => removeAdditionalImage(index)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X size={12} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center py-1 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!coverImage || additionalImages.length === 0}
        >
          Add Item
        </button>
      </div>

      {message && (
        <div
          className={`mt-6 p-4 rounded-md text-center font-medium ${
            message.includes('Error') 
              ? 'bg-red-50 text-red-600 border border-red-200' 
              : 'bg-green-50 text-green-600 border border-green-200'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
