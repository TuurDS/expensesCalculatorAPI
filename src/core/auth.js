const userService = require("../service/user");
const { decode } = require("jsonwebtoken");

/**
 * * Checks if users are logged in before they can see the results of the route
 * 
 * @param ctx
 * @param next
 * @see userService.checkAndParseSession
 * @exception You need to be signed in
 * @exception Invalid authentication token
 * @exception Error while verifying token
 * @exception Token could not be parsed
 */
const requireAuthentication = async (ctx, next) => {
    const { authorization } = ctx.headers;

    const { authToken, ...session } = await userService.checkAndParseSession(
        authorization
    );

    ctx.state.session = session;
    ctx.state.authToken = authToken;

    return next();
};

/**
 * * Checks if users have the right role before they can see the results of the route
 * 
 * @param role 
 * @see userService.checkRequireRole
 * @exception You are not allowed to view this part of the application
 */
const makeRequireRole = (role) => async (ctx, next) => {
    const roles = decode(ctx.headers.authorization.substr(7))?.roles || [];

    userService.checkRequireRole(role, roles);
    return next();
};

/**
 * * Checks that users do not have the given role before they can see the results of the route
 * 
 * @param role 
 * @see userService.checkBanRole
 * @exception You are not allowed to view this part of the application
 */
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
