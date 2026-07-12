import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// টাইপস্ক্রিপ্ট ইন্টারফেস (ডেটার টাইপ নির্দিষ্ট করার জন্য)
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

// ইউজারের ডেটাবেস স্কিমা
const userSchema: Schema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      enum: ["user", "admin"],
      default: "user" 
    },
  },
  { 
    timestamps: true // এটি অটোমেটিক createdAt এবং updatedAt সেভ করবে
  }
);

// ডেটাবেসে সেভ হওয়ার আগে পাসওয়ার্ড এনক্রিপ্ট বা হ্যাশ (Hash) করার মিডলওয়্যার
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// লগইন করার সময় পাসওয়ার্ড মেলানোর ফাংশন
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;