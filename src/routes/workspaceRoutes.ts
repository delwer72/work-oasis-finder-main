import express from "express";
import { getWorkspaces, getWorkspaceById, createWorkspace, deleteWorkspace } from "../controllers/workspaceController";
import { protect } from "../middlewares/authMiddleware"; // সিকিউরিটি গার্ড

const router = express.Router();

// GET রিকোয়েস্ট পাবলিক, কিন্তু POST রিকোয়েস্টে protect বসানো হয়েছে (লগইন ছাড়া স্পেস যোগ করা যাবে না)
router.route("/").get(getWorkspaces).post(protect, createWorkspace);

// নির্দিষ্ট আইডি দিয়ে স্পেস দেখা (পাবলিক)
router.route("/:id").get(getWorkspaceById);

// স্পেস ডিলিট করা (টেস্ট করার জন্য সাময়িকভাবে protect সরিয়ে দেওয়া হলো)
router.delete("/:id", deleteWorkspace);

export default router;