const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {
        name: 'Sudip Mahato',
      };
      const secretKey = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: '10s',
        issuer: 'sudipkumarmahato.com.np',
        audience: userId,
      };

      jwt.sign(payload, secretKey, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },

  //verify acces token using a  middleware
  verifyAccessToken: (req, res, next) => {
    if (!req.headers['authorization']) return next(createError.Unauthorized());

    const authHeader = req.headers['authorization'];

    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        err = {
          name: 'TokenExpiredError',
          message: 'jwt expired',
          expiredAt: 1408621000,
        };
        return next(createError.Unauthorized());
      }
      req.payload = payload;
      next();
    });
  },
};
