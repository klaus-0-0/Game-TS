import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
    const token = req.cookies?.token;
    console.log("token middleware :", token);
    if (!token)
        return res.status(401).json({ message: "Unauthorized" });
    try {
        const secret = process.env.TOKEN;
        const decoded = jwt.verify(token, secret);
        req.user = {
            id: decoded.userId,
            role: decoded.role,
        };
        next();
    }
    catch {
        return res.status(401).json({ message: "Invalid token" });
    }
};
//# sourceMappingURL=userAuthMiddleware.js.map