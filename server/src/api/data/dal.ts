// Data
// import { DataModel } from "../../models";
import DataModel from '../../models'
// Import dto
import { ICreateData } from "./dto";

// Class
export default class DataClass {
  // Create new data method
  static async createData(json_data: ICreateData[]) {
    try {
      for (let i = 1; i < json_data.length; i++) {
        const data: any = json_data[i];
        // Assign values to the required variables
        const item_No = data.__EMPTY;
        const description = data.__EMPTY_1;
        const unit = data.__EMPTY_2;
        const qty = data.__EMPTY_3;
        const rate = data.__EMPTY_4;
        const amount = data.__EMPTY_5;
        await DataModel.create({
          item_No,
          description,
          unit,
          qty,
          rate,
          amount,
        });
      }
    } catch (err) {
      throw err;
    }
  }
  // Fetch all datas from database
  static async getAllDatas() {
    try {
      const datas = await DataModel.findAll();
      return datas;
    } catch (err) {
      throw err;
    }
  }
  // Get single data by id
  static async getById(id: string) {
    try {
      const row = await DataModel.findOne({ where: { id: id } });
      return row;
    } catch (err) {
      throw err;
    }
  }
  // Update data data access layer
  static async updateData(data: ICreateData, id: string) {
    try {
      // Update data by id
      const updated_data = await DataModel.update(data, {
        where: {
          id: id,
        },
      });
      return updated_data;
    } catch (err) {
      throw err;
    }
  }
  // Delete data data access layer
  static async deleteData(id: string) {
    try {
      //Delete Data based on their id
      await DataModel.destroy({
        where: {
          id: id,
        },
      });
    } catch (err) {
      throw err;
    }
  }
  // Delete all
  static async deleteAllDatas() {
    try {
      await DataModel.destroy({
        where: {}, // Empty condition to delete all rows
        truncate: true, // resetting auto-increment values
      });
    } catch (err) {
      throw err;
    }
  }
}
