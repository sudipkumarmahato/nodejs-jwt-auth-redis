const crypto = require('crypto');

const generateSecretKey1 = crypto.randomBytes(32).toString();
const generateSecretKey2 = crypto.randomBytes(32).toString();
console.log({ generateSecretKey1, generateSecretKey2 });
