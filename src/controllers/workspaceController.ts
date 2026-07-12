import { Request, Response } from "express";
import Workspace from "../models/Workspace";
import { AuthRequest } from "../middlewares/authMiddleware";

// @desc    সবগুলো স্পেস একসাথে দেখা
// @route   GET /api/workspaces
export const getWorkspaces = async (req: Request, res: Response): Promise<void> => {
  try {
    const workspaces = await Workspace.find({});
    res.json(workspaces);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    নির্দিষ্ট একটি স্পেসের বিস্তারিত দেখা
// @route   GET /api/workspaces/:id
export const getWorkspaceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const workspace = await Workspace.findById(req.params.id);
    if (workspace) {
      res.json(workspace);
    } else {
      res.status(404).json({ message: "Workspace not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    নতুন স্পেস তৈরি করা (শুধুমাত্র লগইন করা ইউজার পারবে)
// @route   POST /api/workspaces
export const createWorkspace = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, description, address, price, capacity, amenities, image } = req.body;

    const workspace = new Workspace({
      name,
      description,
      address,
      price,
      capacity,
      amenities,
      image,
      user: req.user?._id, // Auth middleware থেকে ইউজারের আইডি নেওয়া হচ্ছে
    });

    const createdWorkspace = await workspace.save();
    res.status(201).json(createdWorkspace);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};