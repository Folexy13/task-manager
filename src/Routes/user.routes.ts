import { UserController } from "../Controllers";
import { Router } from "express";
import { ROUTES } from "../Helpers";
import validate from "../Validations";
import { verifyToken, verifyAdmin } from "../Middlewares";

const router = Router();

router
	.route(`/login`)
	.post(validate(ROUTES.LOGIN), UserController.LoginUser)

router.route("/")
	.post(validate(ROUTES.USER), UserController.CreateUser)
	.get(UserController.GetAllUsers)

router
	.route("/:id")
	.get(verifyToken, UserController.GetUserById)
	.put(verifyToken, UserController.UpdateUser)
	.patch(verifyToken, validate(ROUTES.USER), UserController.setRole)
	.delete(verifyToken, verifyAdmin, UserController.DeleteUser)



export default router;
