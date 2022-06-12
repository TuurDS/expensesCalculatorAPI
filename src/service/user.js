const userRepository = require("../repository/user");
const { generateJWT, verifyJWT } = require("../core/jwt");
const { verifyPassword } = require("../core/password");

const ServiceError = require("../core/serviceError");
const { getChildLogger } = require("../core/logging");
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("user-service");
  this.logger.debug(message, meta);
};

const makeLoginData = async (user) => {
  const token = await generateJWT(user);
  return {
    user: makeExposedUser(user),
    token,
  };
};

const makeExposedUser = ({ password, createdAt, updatedAt, ...user }) => user;

const login = async (name, password) => {
  try {
    const user = await userRepository.findByName(name);
    if (!user) {
      throw new Error("Given password or name is incorrect");
    }

    const validPassword = await verifyPassword(password, user.password);
    if (!validPassword) {
      throw new Error("Given password or name is incorrect");
    }

    debugLog(`user ${name} has logged in`);
    return await makeLoginData(user);
  } catch (error) {
    console.error(error);
  }
};


const checkAndParseSession = async (authHeader) => {
  if (!authHeader) {
    throw ServiceError.unauthorized("You need to be signed in");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw ServiceError.unauthorized("Invalid authentication token");
  }

  const authToken = authHeader.substr(7);
  try {
    const data = await verifyJWT(authToken);

    const { roles, userId } = data;
    return { userId, roles, authToken };
  } catch (error) {
    const logger = getChildLogger("user-service");
    logger.error(error.message, { error, });
    throw ServiceError.unauthorized(error.message);
  }
};


const checkRequireRole = (role, roles) => {
  const hasPermission = roles.includes(role);
  if (!hasPermission) {
    throw ServiceError.forbidden("You are not allowed to view this part of the application");
  }
};


const checkBanRole = (role, roles) => {
  const hasPermission = !roles.includes(role);
  if (!hasPermission) {
    throw ServiceError.forbidden("You are not allowed to view this part of the application");
  }
};

module.exports = {
  login,
  checkAndParseSession,
  checkRequireRole,
  checkBanRole,
};
