require('dotenv');
const bcrypt = require('bcrypt');

const HASHING_SALT = Math.floor(Math.random() * 100000000000000000000);
const bcryptService = () => {
  const hashPassword = ({ password }) => {
    return bcrypt.hash(password, Number(HASHING_SALT));
  };

  const comparePassword = (password, hash) => bcrypt.compare(password, hash);

  return {
    hashPassword,
    comparePassword,
  };
};

module.exports = bcryptService;
