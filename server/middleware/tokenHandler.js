// import jwt from 'jsonwebtoken';
// // import db from '../database/index';

// const generateToken = (user) => {
//   return jwt.sign({ sub: user.id }, process.env.secret, { expiresIn: '1h' });
// };
// const verifyToken = async (req, res, next) => {
//   const token = req.headers['authorization'];

// }
// static async validate(req, res, next) {
//   try {
//     const token = req.headers['x-auth-token'];
//     if (!token) {
//       res.status(401).json({
//         message: 'Access denied.No token provided',
//       });
//       return false;
//     }
//     const decoded = await jwt.verify(token, process.env.SECRET);
//     if (decoded) {
//       req.userData = decoded;
//       next();
//     }
//   } catch (err) {
//     res.status(401).json({
//       message: 'Unauthorized invalid token',
//     });
//   }
// }
// // const verifyToken = (req, res, next) => {
// //   const token = req.headers['x-access-token'] || req.headers['authorization'];
// //   if (!token) {
// //     return res.status(401).json({
// //       status: 'Failed',
// //       error: 'Unathorized, token must be provided',
// //     });
// //   }
// //   jwt.verify(token, process.env.secret, (err, decoded) => {
// //     if (!decoded) {
// //       return res.status(401).json({
// //         status: 'Failed',
// //         error: 'Unable to authenticate token',
// //       });
// //     }
// //     db.query(
// //       'SELECT * FROM users WHERE id = $1',
// //       [decoded.sub],
// //       (err, user) => {
// //         if (!user.rows[0]) {
// //           return res.status(401).json({
// //             status: 'Failed',
// //             error: 'Unable to authenticate token',
// //           });
// //         }
// //         req.decoded = decoded;
// //         next();
// //       }
// //     );
// //   });
// // };

// module.exports = {
//   generateToken,
//   //   verifyToken,
// };
