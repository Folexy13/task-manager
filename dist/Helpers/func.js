"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTPCode = generateOTPCode;
/**
 * Generate a random OTP code of the specified length.
 * @param length The length of the OTP code.
 * @returns A random OTP code.
 */
function generateOTPCode(length) {
    const charset = "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        otp += charset[randomIndex];
    }
    return otp;
}
