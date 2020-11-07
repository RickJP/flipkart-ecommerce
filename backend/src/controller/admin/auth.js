const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const user = require('../../models/user');
const bcrypt = require('bcrypt');
const shortId = require('shortid');

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        message: 'Admin already exists',
      });

    const { firstName, lastName, email, password } = req.body;

    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: shortId.generate(),
      role: 'admin',
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({ message: 'User could not be saved' });
      }
      if (data) {
        return res.status(201).json({
          message: 'Admin created successfully',
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password) && user.role === 'admin') {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: '6h',
          },
        );
        const { _id, firstName, lastName, email, role, fullName } = user;

        res.cookie('token', token, { expiresIn: '6h' });

        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({ message: 'Invalid password' });
      }
    } else {
      return res.status(400).json({ message: 'No user found' });
    }
  });
};

exports.signout = (req, res) => {
  console.log('Starting signout');
  res.clearCookie('token');
  res.status(200).json({
    message: 'Signout successful',
  });
};
