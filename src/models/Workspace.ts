import mongoose, { Document, Schema } from "mongoose";

// টাইপস্ক্রিপ্ট ইন্টারফেস
export interface IWorkspace extends Document {
  title: string;
  shortDescription?: string;
  description: string;
  price: number;
  location: string;
  city: string;
  image: string;
  gallery: string[];
  amenities: string[];
  user: mongoose.Schema.Types.ObjectId;
}

// স্পেসের ডেটাবেস স্কিমা
const workspaceSchema: Schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    image: { type: String, required: true },
    gallery: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      ref: "User" 
    },
  },
  {
    timestamps: true,
  }
);

const Workspace = mongoose.model<IWorkspace>("Workspace", workspaceSchema);
export default Workspace;