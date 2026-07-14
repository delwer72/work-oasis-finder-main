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

// @desc    Delete a workspace
// @route   DELETE /api/workspaces/:id
export const deleteWorkspace = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedWorkspace = await Workspace.findByIdAndDelete(req.params.id);
    
    if (!deletedWorkspace) {
       res.status(404).json({ message: "Workspace not found" });
       return;
    }
    
    res.status(200).json({ message: "Workspace deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    নতুন স্পেস তৈরি করা (শুধুমাত্র লগইন করা ইউজার পারবে)
// @route   POST /api/workspaces
export const createWorkspace = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // ফ্রন্টএন্ড থেকে আসা ডেটাগুলো রিসিভ করা হচ্ছে
    const { title, shortDescription, description, price, location, city, image, gallery, amenities } = req.body;

    const workspace = new Workspace({
      title,
      shortDescription,
      description,
      price,
      location,
      city,
      image,
      gallery,
      amenities,
      user: req.user?._id, // Auth middleware থেকে ইউজারের আইডি
    });

    const createdWorkspace = await workspace.save();
    res.status(201).json(createdWorkspace);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};