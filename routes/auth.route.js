const express = require('express');
const createError = require('http-errors');
const authRouter = express.Router();
const User = require('../models/user.models');
const authSchema = require('../helpers/schemaValidation');
const { signAccessToken } = require('../helpers/generateToken');

authRouter.post('/register', async (req, res, next) => {
  // console.log(req.body);
  // res.status(200).json({
  //   route: 'Register Route',
  // });
  try {
    // const { email, password, username } = req.body;

    // if (!email || !password || !username) throw createError.BadRequest();

    const result = await authSchema.validateAsync(req.body);
    // console.log(result);
    const userExists = await User.findOne({ email: result.email });

    if (userExists)
      throw createError.Conflict(`${result.email} has already been registered`);

    // const user = new User({
    //   username: result.username,
    //   email: result.email,
    //   password: result.password,
    // });
    const user = new User(result);

    const savedUser = await user.save();
    const accessToken = await signAccessToken(savedUser.id);
    res.send({ accessToken });
    // console.log(savedUser);
    console.log(accessToken);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });

    if (!user) throw createError.NotFound('User Not regisrred ');

    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch) throw createError.Unauthorized('Login details not valid');

    const accessToken = await signAccessToken(user.id);
    res.send({ accessToken });
    console.log(accessToken);
  } catch (error) {
    if (error.isJoi === true)
      return next(createError.BadRequest('Invalid Login Details'));
    next(error);
  }
});

authRouter.post('/refresh-token', async (req, res, next) => {
  res.status(200).json({
    route: 'Refresh Token Route',
  });
});

authRouter.delete('/logout', async (req, res, next) => {
  res.status(200).json({
    route: 'Logout Route',
  });
});

module.exports = authRouter;
