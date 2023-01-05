const { User } = require("../data/models")
const findByName = async (username) => {
    const user = await User.findOne({
        where: { name: username },
        raw: true
    });
    return user;
};

const create = async (username, password) => {
    const user = await User.create({
        name: username,
        password,
        role: "USER"
    });
    return user;
};

module.exports = {
    findByName,
    create
};