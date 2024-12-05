import { Router } from "express";
import {
  deleteEmployee,
  registerEmployee,
  getAllEmployees,
  updateEmployee,
  getEmployeeById,
} from "../controllers/employee.controller.js";
import { upload } from '../middlewares/multer.middleware.js'

const router = Router();

router.route("/registeremployee").post(
    upload.fields([
        {
            name : "profileImage",
            maxCount : 1,
        }
    ]),
    registerEmployee)

//  router.route("/deleteemployee").delete(deleteEmployee)  // error
router.route("/deleteemployee/:employeeId").delete(deleteEmployee);  

router.route("/allemployees").get(getAllEmployees);

router.route("/updateemployee/:employeeId").put(updateEmployee);

router.route("/oneemployees/:employeeId").get(getEmployeeById);


export default router