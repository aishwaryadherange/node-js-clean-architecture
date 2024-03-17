import pkg from 'jsonwebtoken';
import responseWrapper from '../helpers/response.helper.js';
const { verify } = pkg;

export function verifyToken(req, res, next) {
  let token = req.headers.authorization;
  if (!token) {
    return res
      .status(403)
      .json({ status: "Unauthorized", message: "Authorization Token Missing" });
  } else {
    const bearer = token.split(" ");
    const bearerToken = bearer[1];
    verify(bearerToken, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ status: "Unauthorized", message: "Invalid Token" });
      }
      req.user = decoded;
      next();
    });
  }
}

export function verifyAdmin(req, res, next) {
  let { user_type } = req.user;
  if (user_type == 3) {
    next()
  }
  else {
    return responseWrapper.unauthorised(res, null)
  }
}