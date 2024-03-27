const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { logger } = require('../../commons/utils')
const { pool } = require('../../commons/db')

const signup = async function(email, username, password){
  try {
    // Check if the user exists in the database
    const selectSql = 'SELECT * FROM `Users` WHERE `email` = ?';
    const selectValues = [email];
    const [rows, fields] = await pool.execute(selectSql, selectValues);

    // If user exists, return an error
    if (rows.length > 0) {
      logger.warn('Email is already used, email: ' + email);
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user data into the database
    const insertSql = 'INSERT INTO `Users` (`email`, `username`, `password`) VALUES (?, ?, ?)';
    const insertValues = [email, username, hashedPassword];
    await pool.execute(insertSql, insertValues);

    logger.info('User registered with email: ' + email);
    return { email: email };
  } catch (error) {
    logger.error('Error during signup:' + error);
    throw error;
  }
}

const login = async function(email, password){
  try {
    // Check if the user exists in the database
    const selectSql = 'SELECT * FROM `Users` WHERE `email` = ?';
    const selectValues = [email];
    const [rows, fields] = await pool.execute(selectSql, selectValues);

    // If user exists, continue to proccess JWT
    if (rows.length > 0) {
      const passwordHashed = rows[0].password;
      const passMatched = await bcrypt.compare(password, passwordHashed);

      if (passMatched) {
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        const expiredDate = new Date();
        expiredDate.setDate(expiredDate.getDate() + 1);
        const data = {
          email: email,
          expiration: expiredDate
        }
        const token = jwt.sign(data, jwtSecretKey);
        const res = {
          token: token
        }
        logger.info('Login successful, email: ' + email)
        return res;
      } else {
        // Wrong password error
        logger.warn('Password is not match, email: ' + email)
        return {};
      }
      // User not found error
    } else {
      logger.warn('Email not found in database, email: ' + email);
      return {};
    }
  } catch (error) {
    logger.error('Error during login:' + error);
    throw error;
  }
}


module.exports = { login, signup };
