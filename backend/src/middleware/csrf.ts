import crypto from "crypto";
import { doubleCsrf } from "csrf-csrf";
import dotenv from "dotenv";
dotenv.config();

// Generate secret ONCE
const csrfSecret: string =
    process.env.CSRF_SECRET!
console.log("csrf.env = ", csrfSecret);

export const {
  doubleCsrfProtection,
  generateCsrfToken,
} = doubleCsrf({
  getSecret: () => csrfSecret, // can be ANY constant string

  getSessionIdentifier: () => "stateless", // ✅ FIX

  cookieName: "_csrf",

  cookieOptions: {
    httpOnly: true,                     // Must be false for JS access
    sameSite: "lax",                   // Cross-site (frontend ≠ backend)
    secure: true,                       // HTTPS required on Render
    // partitioned: true,                  // This fixes your cookie transmission
    maxAge: 24 * 60 * 60 * 1000,        // 24h expiry
  },

  size: 64,
  ignoredMethods: ["GET", "HEAD", "OPTIONS"],
});
