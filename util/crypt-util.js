const config = rootRequire('/config/app'); // eslint-disable-line
const crypto = require('crypto');
const cipherseed = config.CRYPTO_KEY;

const encrypt = text => {
  const cipher = crypto.createCipher(config.CRYPTO_ALGORITHM, cipherseed);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

const decrypt = text => {
  const decipher = crypto.createDecipher(config.CRYPTO_ALGORITHM, cipherseed);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

module.exports = {
  encrypt,
  decrypt,
};
