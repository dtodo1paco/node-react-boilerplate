/* eslint consistent-return:0 */

// https://gist.github.com/branneman/8048520
const rootRequire = name => require(`${__dirname}${name}`); // eslint-disable-line
global.rootRequire = rootRequire;

const express = require('express');

const logger = rootRequire('/config/logger');
rootRequire('/config/db');
const cors = rootRequire('/config/cors');
const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
// const CORSError = rootRequire('/errors/CORSError');

const app = express();
app.use(cors);

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
const authController = rootRequire('/controllers/AuthController');
app.use('/api/auth', authController);
const userController = rootRequire('/controllers/UserController');
app.use('/api/user', userController);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// CATCH ALL ERRORS -- must be the last use()
app.use((err, req, res) => {
  // eslint-disable-next-line
  console.error(`ERROR on SERVER:
    ${JSON.stringify(err.status)} : ${JSON.stringify(err.message)}`);
  res.status(err.status).send(err.message);
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
