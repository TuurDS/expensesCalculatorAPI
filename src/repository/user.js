const { sequelize, User } = require("../data/models")
const findByName = async (username) => {
    const user = await User.findOne({
        where: { name: username }
    });
    console.log(user.dataValues);
    return user.dataValues;
};

module.exports = {
    findByName,
};