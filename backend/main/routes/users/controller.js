const express = require('express');
const router = express.Router();
const { logger } = require('../../commons/utils')
const { login, signup, viewProfile, updateProfile, deleteProfile } = require('./dblogic')

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
    res.status(500).send({ status: 'Error', message: 'Internal server error' });
  }
})

router.get("/viewProfile", async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const result = await viewProfile(token);

    if (result) {
      res.send({ status: 'OK', message: "Done getting profile data", data: result })
    } else {
      res.status(401).send({ status: 'Error', message: 'Invalid email or password' })
    }
  } catch (error) {
    res.status(500).send({ status: 'Error', message: 'Internal server error' });
  }
})

router.post("/updateProfile", async (req, res) => {
  const { username, email, oldPass, newPass } = req.body;

  try {
    const result = await updateProfile(username, email, oldPass, newPass);

    if (result) {
      res.send({ status: 'OK', message: "Done updating profile data", data: result })
    } else {
      res.status(401).send({ status: 'Error', message: 'Something error' })
    }
  } catch (error) {
    res.status(500).send({ status: 'Error', message: 'Internal server error' });
  }
})

router.post("/deleteProfile", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const result = await deleteProfile(email, password);

    if (result) {
      res.send({ status: 'OK', message: "User profile deleted successfully", data: result })
    } else {
      res.status(401).send({ status: 'Error', message: 'Invalid email or password' })
    }
  } catch (error) {
    res.status(500).send({ status: 'Error', message: 'Internal server error' });
  }
})

module.exports = router;
