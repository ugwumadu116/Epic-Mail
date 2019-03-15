import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class checkAuth {
  static async validate(req, res, next) {
    try {
      const token = req.headers['x-auth-token'];
      if (!token) {
        res.status(401).json({
          message: 'Access denied.No token provided',
        });
      }
      const decoded = await jwt.verify(token, process.env.SECRET);
      if (decoded) {
        req.userData = decoded;
        next();
      }
    } catch (err) {
      res.status(401).json({
        message: 'Unauthorized invalid token',
      });
    }
  }
}
export default checkAuth;
