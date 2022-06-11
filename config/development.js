module.exports = {
  log: {
    level: "silly",
    disabled: false,
  },
  cors: {
    origins: ["*"],
    maxAge: 3 * 60 * 60,
  },
  auth: {
    argon: {
      saltLength: 16,
      hashLength: 32,
      timeCost: 6,
      memoryCost: 2 ** 17,
    },
    jwt: {
      expirationInterval: 60 * 60 * 1000 * 10, // ms (10 hour)
      issuer: "",
      audience: "",
    },
  },
};