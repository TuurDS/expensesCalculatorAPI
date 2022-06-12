const Router = require("@koa/router");

const InstallUser = require("./_user");
const InstallEvent = require("./_event");

module.exports = (app) => {
  const router = new Router({ prefix: "/api", });

  InstallUser(router);
  InstallEvent(router);

  app.use(router.routes()).use(router.allowedMethods());
};