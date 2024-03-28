const express = require('express');
const router = express.Router();
const { logger } = require('../../commons/utils')
const { contentList, contentDetails } = require('./dblogic')
const { checkPremiumContent, auth } = require('../../commons/midware')

router.get('/content-list', async (req, res) => {
  try {
    const result = await contentList();

    if (result) {
      res.send({ status: 'OK', message: "Content list collected", data: result });
    } else {
      res.status(401).send({ status: 'Error', message: 'Unauthorized, try to relogin' });
    }
  } catch (error) {
    logger.error('Error during get content: ' + error);
    res.status(500).send({ status: 'Error', message: 'Internal server error' });
  }
})

// Must send auth headers to use securely use this API
router.get('/content-details/:id', checkPremiumContent, auth, async (req, res) => {
  const id = req.params.id;

  try {
    const result = await contentDetails(id);

    if (result) {
      res.send({ status: 'OK', message: "Content list collected", data: result });
    } else {
      res.status(400).send({ status: 'Error', message: 'Error collecting content' });
    }
  } catch (error) {
    logger.error('Error during get content: ' + error);
    res.status(500).send({ status: 'Error', message: 'Internal server error' });
  }
})

module.exports = router;
