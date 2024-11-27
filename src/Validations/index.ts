
import { body, ValidationChain, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { ROUTES } from "../Helpers";

/**
 * A class for defining request validation based on the provided method.
 * @class
 */
class Validator {
	private method: string;

	constructor(method: string) {
		this.method = method;
	}

	/**
	 * Get the validation chains based on the selected method.
	 * @returns {ValidationChain[]} An array of validation chains.
	 */
	validate(): ValidationChain[] {
		switch (this.method) {
			case ROUTES.TASK: {
				return [
					body("title")
						.not()
						.isEmpty()
						.withMessage("Title is required")
						.isString()
						.withMessage("Title must be a string."),
					body("description")
						.isString()
						.withMessage("Description must be a string")
						.isLength({ min: 6 })
						.withMessage("Description must be at least 6 characters long"),
					body("due_date")
						.not()
						.isEmpty()
						.withMessage("Due Date is required")
						.isString()
						.withMessage("Due Date must be a string"),
				];
			}

			case ROUTES.USER: {
				return [
					body("email")
						.not()
						.isEmpty()
						.withMessage("Email is required")
						.isEmail()
						.withMessage("Invalid Email type")
						.isString()
						.withMessage("Email must be a string."),
					body("full_name")
						.not()
						.isEmpty()
						.withMessage("Full name is required")
						.isString()
						.withMessage("Full name must be a string."),
					body("phone")
						.isString()
						.withMessage("Phone must be a string")
						.isLength({ min: 11, max: 14 })
						.withMessage("Phone is not a valid Nigerian number"),
					body("password").exists().withMessage("Password is required"),
				];
			}

			case ROUTES.LOGIN: {
				return [
					body("email")
						.not()
						.isEmpty()
						.withMessage("Email is required")
						.isEmail()
						.withMessage("Invalid Email type")
						.isString()
						.withMessage("Email must be a string."),
					body("password")
						.not()
						.isEmpty()
						.withMessage("Password is required")
						.isNumeric()
						.withMessage("Password must be a number")
						.isLength({ min: 6 })
						.withMessage("Password must be at least 6 characters long"),
				];
			}

			case ROUTES.ROLE: {
				return [
					body("role")
						.not()
						.isEmpty()
						.withMessage("Incomplete parameter!!")
						.isString()
						.withMessage("Password must be a string")
				];
			}
			default: {
				throw new Error(`Validation method '${this.method}' not implemented.`);
			}
		}
	}
}

/**
 * Middleware function to perform request validation.
 * @param {string} method - The method for validation.
 * @returns {Function} An Express middleware function.
 */
const validate = (method: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const validator = new Validator(method);
		const validationChain = validator.validate();

		Promise.all(validationChain.map((validation) => validation.run(req))).then(
			() => {
				const errors = validationResult(req);
				if (errors.isEmpty()) {
					next();
				} else {
					res.status(400).json({ errors: errors.array() });
				}
			}
		);
	};
};

export default validate;

