import { Response } from "express";
import Booking from "../models/Booking";
import { AuthRequest } from "../middlewares/authMiddleware";

// @desc    নতুন বুকিং তৈরি করা
// @route   POST /api/bookings
export const createBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { workspace, date, startTime, endTime, totalPrice } = req.body;

    const booking = new Booking({
      user: req.user?._id, // Auth middleware থেকে লগইন করা ইউজারের আইডি
      workspace,
      date,
      startTime,
      endTime,
      totalPrice,
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};

// @desc    লগইন করা ইউজারের নিজের বুকিংগুলো দেখা
// @route   GET /api/bookings/my-bookings
export const getMyBookings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // ইউজারের আইডি দিয়ে বুকিং খোঁজা এবং সাথে স্পেসের কিছু তথ্য (populate) নিয়ে আসা
    const bookings = await Booking.find({ user: req.user?._id }).populate("workspace", "name address price image");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};

// @desc    অ্যাডমিন হিসেবে ওয়েবসাইটের সমস্ত বুকিং দেখা
// @route   GET /api/bookings/all
export const getAllBookings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // এখানে আমরা user এবং workspace উভয়েরই কিছু তথ্য populate করে নিয়ে আসছি
    const bookings = await Booking.find({})
      .populate("user", "name email")
      .populate("workspace", "name");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};

// @desc    বুকিংয়ের স্ট্যাটাস আপডেট করা (যেমন: pending থেকে confirmed করা)
// @route   PUT /api/bookings/:id/status
export const updateBookingStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (booking) {
      booking.status = req.body.status || booking.status;
      const updatedBooking = await booking.save();
      res.json(updatedBooking);
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};