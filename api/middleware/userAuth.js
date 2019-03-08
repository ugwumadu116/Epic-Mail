import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class checkAuth {
  static async validate(req, res, next) {
    try {
      const token = req.headers['x-auth-token'];
      if (!token) {
        res.status(401).send('Access denied.No token provided');
      }
      const deceoded = await jwt.verify(token, process.env.SECRET);
      if (deceoded) {
        req.userData = deceoded;
        next();
      }
    } catch (error) {
      res.status(400).json({
        message: 'Unauthorised invalid token',
      });
    }
  }
}
export default checkAuth;
