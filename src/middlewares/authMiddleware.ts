import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

// Request ইন্টারফেস আপডেট করা হচ্ছে যাতে req.user ব্যবহার করা যায়
export interface AuthRequest extends Request {
  user?: IUser;
}

// এই ফাংশনটি চেক করবে ইউজারের কাছে সঠিক টোকেন আছে কি না
export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token;

  // হেডারে Authorization এবং Bearer টোকেন আছে কি না চেক করা
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // টোকেনটি আলাদা করা (Bearer <token> থেকে শুধু টোকেনটা নেওয়া)
      token = req.headers.authorization.split(" ")[1];

      // টোকেন ডিকোড বা ভেরিফাই করা
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

      // ডেটাবেস থেকে ইউজার খুঁজে বের করে পাসওয়ার্ড বাদে বাকি ডেটা req.user-এ সেট করা
      const user = await User.findById(decoded.id).select("-password");
      
      if (user) {
        req.user = user;
        next(); // টোকেন সঠিক হলে পরের ধাপে যেতে দেওয়া হবে
      } else {
        res.status(401).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // যদি কোনো টোকেন না পাওয়া যায়
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
}; 

// এই ফাংশনটি চেক করবে ইউজার অ্যাডমিন কি না
export const admin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user && req.user.role === "admin") {
    next(); // ইউজার অ্যাডমিন হলে কাজ করতে পারবে
  } else {
    res.status(403).json({ message: "Not authorized as an admin" }); // অ্যাডমিন না হলে আটকে দেবে
  }
};