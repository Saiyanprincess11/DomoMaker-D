const models = require('../models');

const { Account } = models;
const loginPage = (req, res) => res.render('login');
const homePage = (req, res) => res.render('home');

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

// Login Information
const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/maker' });
  });
};

// Validates password data
const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  // Checks to see if passwords match
  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  // Tries to create a new user with username & password
  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/maker' });
  } catch (err) { // Otherwise handles any error thrown
    console.log(err);

    // If username has already been used...
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use!' });
    }
    return res.status(500).json({ error: 'An error occured!' });
  }
};

// -- To Fix --
// Changes password
const changePassword = async (req, res) => {
  // const username = `${req.body.username}`;
  const oldPassword = `${req.body.pass}`;
  const newPassword = `${req.body.newpass}`;
  const newPassword2 = `${req.body.newpass2}`;

  // Makes sure user enters all fields
  if (!newPassword || !newPassword2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  // Makes sure passwords match
  if (newPassword !== newPassword2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  // Makes sure old password isn't the same as new password
  if (oldPassword === newPassword) {
    return res.status(400).json({ error: 'Please enter a new password' });
  }

  // Tries to change password
  try {
    // Gets users account

    // verifies old password works

    // switches new password

    // saves account and returns to app page
    // req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/maker' });
  } catch (err) {
    console.log(err);

    // If password has already been used...
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Password already in use!' });
    }
    return res.status(500).json({ error: 'An error occured!' });
  }
};

module.exports = {
  loginPage,
  homePage,
  login,
  logout,
  signup,
  changePassword,
};
