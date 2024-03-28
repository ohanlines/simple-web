const { logger } = require('../../commons/utils')
const { pool } = require('../../commons/db')

const contentList = async function(){
  logger.info('Getting into contentList');

  try {
    const selectSql = 'SELECT `id`, `Title`, `Premium_Content` FROM `Content`';
    const [rows, fields] = await pool.execute(selectSql);
    const contentGroups = {
      free: [],
      premium: []
    }

    rows.forEach(game => {
      if (game.Premium_Content === 0) {
        contentGroups.free.push(game);
      } else {
        contentGroups.premium.push(game);
      }
    });
    logger.info('Contents collected');
    return contentGroups;
  } catch(error) {
    logger.error('Error while getting content list: ' + error);
    throw error;
  }

}

const contentDetails = async function(id) {
  logger.info('Getting into contentDetails');

  try {
    const selectSql = 'SELECT `Title`, `Description`, `Youtube_Code` FROM `Content` WHERE `id` = ?';
    const selectValue = [id];
    const [rows, fields] = await pool.execute(selectSql, selectValue);
    return rows;
  } catch(error) {
    logger.error('Error while getting content details: ' + error);
    throw error;
  }
}

module.exports = { contentList, contentDetails };
