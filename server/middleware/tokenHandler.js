import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../config/db';

dotenv.config();
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-auth-token'];
    if (!token) {
      throw new Error('Unauthorized, token must be provided');
    }
    const decoded = jwt.verify('token', 'secrete');
    console.log(decoded);
    // if (!decoded) {
    //   throw new Error('Unable to authenticate token');
    // }
    // const sql = 'SELECT * FROM usersx WHERE id = $1';
    // const bindParameter = [decoded];
    // const client = await db.connect();
    // const result = await client.query(sql, bindParameter);
    // client.release();
    // console.log(result.rows);
    // next();
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};

// const verifyToken = (req, res, next) => {
//   const token = req.headers['x-access-token'] || req.headers['authorization'];
//   if (!token) {
//     return res.status(401).json({
//       status: 'Failed',
//       error: 'Unauthorized, token must be provided',
//     });
//   }
//   jwt.verify(token, process.env.secret, (err, decoded) => {
//     console.log(decoded);
//     if (!decoded) {
//       return res.status(401).json({
//         status: 'Failed',
//         error: 'Unable to authenticate token',
//       });
//     }
//     db.query(
//       'SELECT * FROM users WHERE id = $1',
//       [decoded.sub],
//       (err, user) => {
//         if (!user.rows[0]) {
//           return res.status(401).json({
//             status: 'Failed',
//             error: 'Unable to authenticate token',
//           });
//         }
//         req.decoded = decoded;
//         next();
//       }
//     );
//   });
// };

export default { verifyToken };
// export default {
//   userCheck,
//   assignMail,
//   checkIfEmailExist,
//   checkIfPhoneExist,
//   checkIfLoginEmailExist,
// };
