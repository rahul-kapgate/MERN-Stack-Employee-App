import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from '../models/admin.model.js'
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefereshTokens = async (userId) => {

  const admin = await Admin.findById(userId);

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

    try {
        
        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.generateRefreshToken();

        admin.refreshToken = refreshToken;
        await admin.save({ validateBeforeSave: false  });
        
        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(
          500,
          "Something went wrong while generating referesh and access token"
        );
    }
}

const registerAdmin = asyncHandler( async (req, res) => {

    const { name , password } = req.body;

    if (!name || !password) {
      throw new ApiError(400, "Username and password are required");
    }

    if(name === ""){
        throw new ApiError(400, "username is required");
    }

    if(password === ""){
        throw new ApiError(400, "password is required");
    }

    const existedAdmin = await Admin.findOne({name})

    if(existedAdmin){
        throw new ApiError(
          409,
          "Admin with name already existed !!"
        );
    }

    const admin = await Admin.create({
        name,
        password,
    });

    const createdAdmin = await Admin.findById(admin._id).select(
      "-password -refreshToken"
    );

    if(!createdAdmin){
        throw new ApiError(500, "Error while registing Admin");
    }

    if(createdAdmin){
      console.log(`${admin.name} is created`)
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            createdAdmin,
            "Admin created successfully"
        )
    )
})

const loginAdmin = asyncHandler( async(req, res) => {

  const {name, password} = req.body;

  if(!name){
    throw new ApiError(404, "name is required");
  }

  const admin = await Admin.findOne({name});

  if(!admin){
    throw new ApiError(400, "User Not found");
  }

  const isPasswordValid = await admin.isPasswordCorrect(password);

  if(!isPasswordValid){
    throw new ApiError(401, "Password is Inccorrect");
  }

  const { accessToken, refreshToken} =  await generateAccessAndRefereshTokens(
    admin._id
  );

  const loggedInAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  console.log("Admin Logged in Successfully");

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(
      200,
      {
        admin : loggedInAdmin,
        accessToken,
        refreshToken,
      },
      "Admin Logged In Successfully !! "
    )
  )

})

const logoutAdmin = asyncHandler( async (req,res) => {

  // if(!res.admin || !res.admin._id){
  //   return res.status(400).json(new ApiResponse(400, {}, "Invalid user"));
  // }

  await Admin.findByIdAndUpdate(
    req.admin._id,
    {
      $unset : {
        refreshToken : 1,
      },
    },
    {
      new : true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  console.log("Admin logout !!" , req.admin.name)

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
      new ApiResponse(
        200,
        {},
        "Admin logged Out"
      )
    )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken)
    throw new ApiError(401, " Invalid USerunauthorized request");

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const admin = await Admin.findById(decodedToken?._id);

    if (!admin) {
      throw new ApiError(401, "Invalid Refresh Token");
    }

    if (incomingRefreshToken !== admin.refreshToken) {
      throw new ApiError(401, "refresh token is expried to used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(admin._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access Token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid reffresh Token");
  }
});

export { registerAdmin, loginAdmin, logoutAdmin, refreshAccessToken };