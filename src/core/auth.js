const userService = require("../service/user");
const { decode } = require("jsonwebtoken");

const requireAuthentication = async (ctx, next) => {
    const { authorization } = ctx.headers;

    const { authToken, ...session } = await userService.checkAndParseSession(
        authorization
    );

    ctx.state.session = session;
    ctx.state.authToken = authToken;

    return next();
};

const makeRequireRole = (role) => async (ctx, next) => {
    const roles = decode(ctx.headers.authorization.substr(7))?.roles || [];

    userService.checkRequireRole(role, roles);
    return next();
};

const makeBannedRole = (role) => async (ctx, next) => {
    const roles = decode(ctx.headers.authorization.substr(7))?.roles || [];

    userService.checkBanRole(role, roles);
    return next();
};

module.exports = {
    requireAuthentication,
    makeRequireRole,
    makeBannedRole
};
