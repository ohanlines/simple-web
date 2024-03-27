const express = require('express');
const router = express.Router();
const { logger } = require('../../commons/utils')
const { login, signup } = require('./dblogic')

router.post("/signup", async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  try {
    const result = await signup(email, username, password);

    if (result) {
      res.send({ status: 'OK', message: "User signup successfully", data: result });
    } else {
      res.status(400).send({ status: 'Error', message: 'Email is already used, try different email' });
    }
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send({ status: 'Error', message: 'Internal server error' });
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const result = await login(email, password);

    if (result.token) {
      res.send({ status: 'OK', message: "User login successfully", data: result })
    } else {
      res.status(401).send({ status: 'Error', message: 'Invalid email or password' })
    }
  } catch (error) {
    logger.error('Error during login: ' + error);
    res.status(500).send({ status: 'Error', message: 'Internal server error' });
  }
})

module.exports = router;
