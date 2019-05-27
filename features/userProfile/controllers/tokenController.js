const userData = require("./../../../database/models/userSensitiveDataSchema");

const authorization = async (payload, done) => {
    try{
        const foundedUser = await userData.findById(payload._id);
        done(null, foundedUser);
    }catch(error){
        done(error.null);
    }
};

module.exports = authorization;
