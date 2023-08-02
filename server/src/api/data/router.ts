// Router
import { Router } from "express";
const router = Router();

// Controller functions
import { createData, getAllDatas,updateData,deleteData } from "./controller";

// Routes
router
  .route("/")
  .post(createData)
  .get(getAllDatas);
router.route("/:id").patch(updateData).delete(deleteData);

// Export
export default router;

