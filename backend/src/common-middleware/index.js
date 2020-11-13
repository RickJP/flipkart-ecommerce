const jwt = require('jsonwebtoken');

exports.requireSignin = (req, res, next) => {
  console.log('requireSignin');
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);

      req.user = user;

      next();
    } catch (err) {
      return res.status(400).json({ message: 'Server error' });
    }
  } else {
    return res.status(400).json({ message: 'Authorization required' });
  }
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(400).json({ message: 'User Access Denied' });
  }

  next();
};

exports.adminMiddleware = (req, res, next) => {
  console.log('Admin Middleware');
  if (req.user.role !== 'admin') {
    return res.status(400).json({ message: 'Admin Access Denied' });
  }

  next();
};
