import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      required: true,
      enum: ['Shirt', 'Pant', 'Shoes', 'Sports Gear'],
    },
    description: { type: String, required: true, trim: true },
    coverImage: { type: String, required: true }, // Cloudinary URL string
    additionalImages: [{ type: String }], // array of URLs
  },
  { timestamps: true }
);

const Item = mongoose.model('Item', itemSchema);

export default Item;
