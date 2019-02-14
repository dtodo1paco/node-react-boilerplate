const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load(); // eslint-disable-line global-require
}
const mongoConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '27017',
  db: process.env.DB_NAME || 'test',
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
};
try {
  if (
    mongoConfig.user &&
    mongoConfig.user !== null &&
    mongoConfig.user !== ''
  ) {
    console.log('connecting to ENV database'); // eslint-disable-line
    mongoose.connect(
      `mongodb://${mongoConfig.user}:${mongoConfig.pass}@${mongoConfig.host}:
      ${mongoConfig.port}/${mongoConfig.db}`,
      { useNewUrlParser: true },
    );
  } else {
    console.log('connecting to local database'); // eslint-disable-line
    mongoose.connect(
      `mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.db}`,
      { useNewUrlParser: true },
    );
  }
} catch (error) {
  console.error(`Error connecting to database: ${error}`); // eslint-disable-line
}
