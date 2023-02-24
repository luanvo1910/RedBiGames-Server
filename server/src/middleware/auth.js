const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token)
        return res.status(401).json({success: false, message: 'Access token not found'})

        try{
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            req.userId = decoded.userId
            next()
        } catch(error){
            console.log(error)
            return res.status(403).json({success: false, message: 'Invalid token'})
        }
}

// isAdmin = (req, res, next) => {
//     User.findById(req.userId).exec((err, user) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }
//       const role = user.role
//       if (role !== "admin") {
//         res.status(403).send({ message: "Require Admin Role!" });
//     }
//     });
// };

  const authJwt = {
      verifyToken
  }

module.exports = authJwt;