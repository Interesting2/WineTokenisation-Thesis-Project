const crypto = require('crypto');

// random password_salt
function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
};

// password_hash
function generateHash (password, salt)  {
    return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
};
  

module.exports = { generateHash,generateSalt};
