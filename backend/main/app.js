require('dotenv').config();

const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT;
const { logger } = require('./commons/utils')


app.use(cors())
app.use(express.json());
app.use((err, req, res, next) => {
  logger.error(err.stack)
  next(err)
})

// router
const userRoutes = require('./routes/users/controller')
const contentRoutes = require('./routes/contents/controller')

app.use('/users', userRoutes);
app.use('/contents', contentRoutes);

app.listen(port, () => {
  logger.info('Server running at port: ' + port)
})
