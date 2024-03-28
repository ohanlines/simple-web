const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { logger } = require('../../commons/utils')
const { pool } = require('../../commons/db')

const signup = async function(email, username, password){
  logger.info('Getting into signup');

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
  logger.info('Getting into login');

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

const viewProfile = async function(token){
  logger.info('Getting into viewProfile');

  try {
    const email = jwt.decode(token, process.env.JWT_SECRET_KEY).email;
    logger.info('Seeing profile for email: ' + email);

    const selectSql = 'SELECT * FROM `Users` WHERE `email` = ?';
    const selectValues = [email];
    const [rows, fields] = await pool.execute(selectSql, selectValues);
    const res = {
      username: rows[0].username,
      email: rows[0].email
    }
    return res;

  } catch (error){
    logger.error('Error during getting profile: ' + error)
  }
}

const updateProfile = async function(username, email, oldPass, newPass){
  logger.info('Getting into updateProfile');
  console.log('sending: ', username, email, oldPass, newPass)

  try {
    const selectSql = 'SELECT * FROM `Users` WHERE `email` = ?';
    const selectValues = [email];
    const [rows, fields] = await pool.execute(selectSql, selectValues);
    const passwordHashed = rows[0].password;
    const oldPassMatched = await bcrypt.compare(oldPass, passwordHashed);
    const newPassMatched = await bcrypt.compare(newPass, passwordHashed);

    if (oldPassMatched){
      if (newPassMatched){
        logger.warn('Cannot use the same password, email: ' + email);
        return;
      } else {
        const newPassHashed = await bcrypt.hash(newPass, 10);
        const changedData = {
          email: email,
          username: username,
          password: newPassHashed
        }

        const oldData = {
          email: rows[0].email,
          username: rows[0].username,
          password: rows[0].password
        }
        console.log('changedData:', changedData);
        console.log('oldData:', oldData);

        const newData = {
          ...oldData,
          ...changedData
        }

        const updateSql = 'UPDATE `Users` SET `email` = ?, `username` = ?, `password` = ? WHERE `email` = ?';
        const updateVal = [newData.email, newData.username, newData.password, newData.email];
        await pool.execute(updateSql, updateVal);

        delete newData.password;
        return newData;
      }
    } else {
      logger.warn('Password did not match, email: ' + email);
      return;
    }
  } catch (error) {
    logger.error['Error during updating profile: ' + error]
  }
}

const deleteProfile = async function(email, password){
  logger.info('Getting into deleteProfile');

  try {
    // Check if the user exists in the database
    const selectSql = 'SELECT * FROM `Users` WHERE `email` = ?';
    const selectValues = [email];
    const [rows, fields] = await pool.execute(selectSql, selectValues);
    const passwordHashed = rows[0].password;

    // If user exists, continue to proccess JWT
    if (rows.length > 0) {
      const passMatched = await bcrypt.compare(password, passwordHashed);

      if (passMatched) {
        const deleteSql = 'DELETE FROM `Users` WHERE `email` = ?';
        const deleteVal = [email];
        await pool.execute(deleteSql, deleteVal);

        logger.info('Account deleted, email: ' + email)
        return { email: email };
      } else {
        // Wrong password error
        logger.warn('Password is not match, email: ' + email);
      }
      // User not found error
    } else {
      logger.warn('Email not found in database, email: ' + email);
    }
  } catch (error) {
    logger.error('Error during delete account: ' + error);
    throw error;
  }
}

module.exports = { login, signup, viewProfile, updateProfile, deleteProfile };
