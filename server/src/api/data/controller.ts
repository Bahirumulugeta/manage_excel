// Request handler
import { RequestHandler } from "express";
// Dto
import { ICreateData } from "./dto";
// Class
import DataClass from "./dal";
//Error handler
import AppError from "../../utils/appError";

// Create new data
export const createData: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const check = await DataClass.getAllDatas();
    // Check the table is empty or not
    if (check.length !== 0) {
      await DataClass.deleteAllDatas();
    }
    const new_data = await DataClass.createData(data);

    // Response
    res.status(201).json({
      status: "Success",
      message: "Data created successfully",
      data: new_data,
    });
  } catch (error) {
    next(error);
  }
};
// Get all datas controller
export const getAllDatas: RequestHandler = async (req, res, next) => {
  try {
    // All datas that are saved in data base
    const datas = await DataClass.getAllDatas();
    // Response
    res.status(200).json({
      status: "Success",
      data: datas,
    });
  } catch (error) {
    next(error);
  }
};
// Update data controller
export const updateData: RequestHandler = async (req, res, next) => {
  try {
    // Get the row by id
    const row = DataClass.getById(req.params.id);
    // Check the id if exists
    if (!row) return next(new AppError("Row not found with this id", 404));

    // Update
    await DataClass.updateData(req.body, req.params.id);

    // Response
    res.status(200).json({
      status: "Success",
      message: "Updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
// Delete data controller
export const deleteData: RequestHandler = async (req, res, next) => {
  try {
    // Check the row if it exist before trying to delete it
    const row = await DataClass.getById(req.params.id);
    if (!row) return next(new AppError("Row not found with this id", 404));
    // Delete data if the row exists
    await DataClass.deleteData(req.params.id);
    // Response
    res.status(200).json({
      status: "Success",
      message: "Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
