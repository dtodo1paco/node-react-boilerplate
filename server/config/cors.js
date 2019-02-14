const cors = require('cors');
const CORSError = rootRequire('/errors/CORSError'); // eslint-disable-line

const whitelist = [
  'http://localhost:3000',
  'http://192.168.1.140:3000',
  'http://192.168.1.141:3000',
  'http://192.168.1.142:3000',
  'http://192.168.1.143:3000',
  'http://192.168.1.144:3000',
  'http://192.168.1.145:3000',
];

const corsOptions = {
  origin: (origin, callback) => {
    // console.log("origin: " + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // console.log("pasa origin: " + origin);
      callback(null, true);
    } else {
      // console.log("EEEEPA origin: " + origin);
      callback(new CORSError(), false);
    }
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

module.exports = cors(corsOptions);
