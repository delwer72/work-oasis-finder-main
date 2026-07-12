import express from "express";
import { 
  createBooking, 
  getMyBookings, 
  getAllBookings, 
  updateBookingStatus 
} from "../controllers/bookingController";
import { protect, admin } from "../middlewares/authMiddleware";

const router = express.Router();

// সাধারণ ইউজারের রাউট
router.route("/").post(protect, createBooking);
router.route("/my-bookings").get(protect, getMyBookings);

// শুধুমাত্র অ্যাডমিনের রাউট 
router.route("/all").get(protect, admin, getAllBookings);
router.route("/:id/status").put(protect, admin, updateBookingStatus);

export default router;