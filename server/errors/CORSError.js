const ApplicationError = require('./ApplicationError');

class CORSError extends ApplicationError {
  constructor(message) {
    super(message || 'error.forbidden', 403);
  }
}
module.exports = CORSError;
