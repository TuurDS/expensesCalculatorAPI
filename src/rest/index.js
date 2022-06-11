const Router = require("@koa/router");

const InstallUser = require("./_user");

module.exports = (app) => {
  const router = new Router({ prefix: "/api", });

  InstallUser(router);

  app.use(router.routes()).use(router.allowedMethods());
};