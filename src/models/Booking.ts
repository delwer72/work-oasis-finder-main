import mongoose, { Document, Schema } from "mongoose";

// টাইপস্ক্রিপ্ট ইন্টারফেস
export interface IBooking extends Document {
  user: mongoose.Schema.Types.ObjectId;
  workspace: mongoose.Schema.Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: string;
}

// বুকিংয়ের ডেটাবেস স্কিমা
const bookingSchema: Schema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      ref: "User" // কে বুকিং করেছে
    },
    workspace: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      ref: "Workspace" // কোন স্পেসটি বুকিং করা হয়েছে
    },
    date: { 
      type: String, 
      required: true // বুকিংয়ের তারিখ
    },
    startTime: { 
      type: String, 
      required: true // কখন থেকে শুরু
    },
    endTime: { 
      type: String, 
      required: true // কখন শেষ হবে
    },
    totalPrice: { 
      type: Number, 
      required: true // মোট কত টাকা বিল হলো
    },
    status: { 
      type: String, 
      enum: ["pending", "confirmed", "cancelled"], 
      default: "pending" // বুকিংয়ের বর্তমান অবস্থা
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;