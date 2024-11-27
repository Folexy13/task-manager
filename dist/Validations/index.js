"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const Helpers_1 = require("../Helpers");
/**
 * A class for defining request validation based on the provided method.
 * @class
 */
class Validator {
    constructor(method) {
        this.method = method;
    }
    /**
     * Get the validation chains based on the selected method.
     * @returns {ValidationChain[]} An array of validation chains.
     */
    validate() {
        switch (this.method) {
            case Helpers_1.ROUTES.TASK: {
                return [
                    (0, express_validator_1.body)("title")
                        .not()
                        .isEmpty()
                        .withMessage("Title is required")
                        .isString()
                        .withMessage("Title must be a string."),
                    (0, express_validator_1.body)("description")
                        .isString()
                        .withMessage("Description must be a string")
                        .isLength({ min: 6 })
                        .withMessage("Description must be at least 6 characters long"),
                    (0, express_validator_1.body)("due_date")
                        .not()
                        .isEmpty()
                        .withMessage("Due Date is required")
                        .isString()
                        .withMessage("Due Date must be a string"),
                ];
            }
            case Helpers_1.ROUTES.USER: {
                return [
                    (0, express_validator_1.body)("email")
                        .not()
                        .isEmpty()
                        .withMessage("Email is required")
                        .isEmail()
                        .withMessage("Invalid Email type")
                        .isString()
                        .withMessage("Email must be a string."),
                    (0, express_validator_1.body)("full_name")
                        .not()
                        .isEmpty()
                        .withMessage("Full name is required")
                        .isString()
                        .withMessage("Full name must be a string."),
                    (0, express_validator_1.body)("phone")
                        .isString()
                        .withMessage("Phone must be a string")
                        .isLength({ min: 11, max: 14 })
                        .withMessage("Phone is not a valid Nigerian number"),
                    (0, express_validator_1.body)("password").exists().withMessage("Password is required"),
                ];
            }
            case Helpers_1.ROUTES.LOGIN: {
                return [
                    (0, express_validator_1.body)("email")
                        .not()
                        .isEmpty()
                        .withMessage("Email is required")
                        .isEmail()
                        .withMessage("Invalid Email type")
                        .isString()
                        .withMessage("Email must be a string."),
                    (0, express_validator_1.body)("password")
                        .not()
                        .isEmpty()
                        .withMessage("Password is required")
                        .isNumeric()
                        .withMessage("Password must be a number")
                        .isLength({ min: 6 })
                        .withMessage("Password must be at least 6 characters long"),
                ];
            }
            case Helpers_1.ROUTES.ROLE: {
                return [
                    (0, express_validator_1.body)("role")
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
const validate = (method) => {
    return (req, res, next) => {
        const validator = new Validator(method);
        const validationChain = validator.validate();
        Promise.all(validationChain.map((validation) => validation.run(req))).then(() => {
            const errors = (0, express_validator_1.validationResult)(req);
            if (errors.isEmpty()) {
                next();
            }
            else {
                res.status(400).json({ errors: errors.array() });
            }
        });
    };
};
exports.default = validate;
