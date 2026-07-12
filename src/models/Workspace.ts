import mongoose, { Document, Schema } from "mongoose";

// টাইপস্ক্রিপ্ট ইন্টারফেস
export interface IWorkspace extends Document {
  name: string;
  description: string;
  address: string;
  price: number;
  capacity: number;
  amenities: string[];
  image: string;
  user: mongoose.Schema.Types.ObjectId; // যে ইউজার স্পেসটি তৈরি করেছে
}

// স্পেসের ডেটাবেস স্কিমা
const workspaceSchema: Schema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    address: { 
      type: String, 
      required: true 
    },
    price: { 
      type: Number, 
      required: true // দিন বা ঘণ্টার ভাড়া
    },
    capacity: { 
      type: Number, 
      required: true // কতজন বসতে পারবে
    },
    amenities: { 
      type: [String], 
      default: [] // সুবিধাগুলো (যেমন: WiFi, AC)
    },
    image: { 
      type: String, 
      required: true // ছবির লিংক
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      ref: "User" // এটি User মডেলের সাথে সম্পর্ক তৈরি করবে
    },
  },
  {
    timestamps: true, // কখন তৈরি বা আপডেট হয়েছে তার রেকর্ড রাখবে
  }
);

const Workspace = mongoose.model<IWorkspace>("Workspace", workspaceSchema);

export default Workspace;