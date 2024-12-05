import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js"; 

export const verifyJWT = asyncHandler(async (req, _, next) => {
  
  
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      if (!token) throw new ApiError(401, "UnAuthorized request !!");

      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      const admin = await Admin.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );

      if (!admin) {
        throw new ApiError(401, "Invalid Access token");
      }

      // Attach the admin object to the request object
      //debugged
      req.admin = admin;

      next();

    } catch (error) {
    
    throw new ApiError(401, error?.message || "Invalid access token catch");
  }
});
