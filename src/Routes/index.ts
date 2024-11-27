import { Router } from "express";
import { ROUTES } from "../Helpers";
import taskRouter from "./task.routes";
import userRouter from "./user.routes";
import { getClientPublicIpFromHeaders } from "request-public-ip";
import { errorHandler, notFound } from "../Exceptions";
const router = Router();

router.get("/", (req, res) => {
	// Get the user's IP address from the request object
	const userIPAddress = getClientPublicIpFromHeaders(req.headers);

	// Send a response with the IP address and "Server is live" message
	res.json({
		message: "Task Manager Server is live",
		userIPAddress,
	});
});


//import other router from their controller
router.use(ROUTES.TASK, taskRouter);
router.use(ROUTES.USER, userRouter);
router.use(notFound);
router.use(errorHandler);

export default router;
