const jwt = require('jsonwebtoken');
const { logger } = require('./utils');
const { pool } = require('./db');

// Auth middleware for authorizing user
// Must have other midware to be placed before this midware
// Those other midware have to return isPremiumContent status inside req
const auth = async function (req, res, next){
  logger.info('Getting into auth');

  try {
    if (req.isPremiumContent) {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      logger.info('Cheking auth for user: ' + decoded.email);


      const selectSql = 'SELECT * FROM `Users` WHERE `email` = ?';
      const selectValue = [decoded.email];
      const [rows, field] = await pool.execute(selectSql, selectValue);

      // Cheking user existance
      if (rows.length > 0){
        const expiredDate = new Date(decoded.expiration);
        const now = new Date();

        // Checking expired date
        if (now < expiredDate) {
          next();
        } else {
          res.status(401).send({ status: 'Error', message: 'Unauthorized, try to relogin' });
        }
      } else {
        res.status(401).send({ status: 'Error', message: 'User is not exist in database' });
      }
    } else {
      next();
    }
  } catch (error) {
    logger.error('Error while checking auth: ' + error);
    res.status(401).send({ status: 'Error', message: 'Unauthorized, try to login' });
  }
}

const checkPremiumContent = async function (req, res, next){
  logger.info('Cheking content category, id: ' + req.params.id);

  try {
    const selectSql = 'SELECT `Premium_Content` FROM `Content` WHERE `id` = ?';
    const selectVal = [req.params.id];
    const [rows, fields] = await pool.execute(selectSql, selectVal);

    // Inserting isPremium key into request
    if (rows[0].Premium_Content == 0){
      req.isPremiumContent = false;
      next();
    } else {
      req.isPremiumContent = true;
      next();
    }
  } catch (error) {
    logger.error('Error while checking premium content: ' + error);
    // throw error;
  }
}

module.exports = { checkPremiumContent, auth };
