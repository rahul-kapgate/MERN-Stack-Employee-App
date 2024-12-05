import { Router } from "express";
import{ registerAdmin, refreshAccessToken, loginAdmin, logoutAdmin } from '../controllers/admin.controller.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/registeradmin").post(registerAdmin);

router.route('/login').post(loginAdmin)

router.route("/logout").post(verifyJWT, logoutAdmin)

router.route("/refresh-token").post(refreshAccessToken);

export default router