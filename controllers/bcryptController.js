const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = Number(process.env.SALT_WORK_FACTOR);

module.exports = {
  securePassword: function(next) {
    if (!this.isModified("password")) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, (error, salt) => {
      if (error) return next(error);
      bcrypt.hash(this.password, salt, (error, hash) => {
        if (error) return next(error);
        this.password = hash;
        next();
      });
    });
  },
};
