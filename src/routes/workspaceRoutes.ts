import express from "express";
import { getWorkspaces, getWorkspaceById, createWorkspace } from "../controllers/workspaceController";
import { protect } from "../middlewares/authMiddleware"; // সিকিউরিটি গার্ড

const router = express.Router();

// GET রিকোয়েস্ট পাবলিক, কিন্তু POST রিকোয়েস্টে protect বসানো হয়েছে (লগইন ছাড়া স্পেস যোগ করা যাবে না)
router.route("/").get(getWorkspaces).post(protect, createWorkspace);
router.route("/:id").get(getWorkspaceById);

export default router;