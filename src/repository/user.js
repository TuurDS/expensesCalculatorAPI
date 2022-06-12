const { User } = require("../data/models")
const findByName = async (username) => {
    const user = await User.findOne({
        where: { name: username },
        raw: true
    });
    return user;
};

module.exports = {
    findByName,
};