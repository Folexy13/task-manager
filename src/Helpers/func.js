"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTPCode = generateOTPCode;
/**
 * Generate a random OTP code of the specified length.
 * @param length The length of the OTP code.
 * @returns A random OTP code.
 */
function generateOTPCode(length) {
    var charset = "0123456789";
    var otp = "";
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * charset.length);
        otp += charset[randomIndex];
    }
    return otp;
}
