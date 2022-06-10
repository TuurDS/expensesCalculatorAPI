const Router = require("@koa/router");


module.exports = (app) => {
  const router = new Router({ prefix: "/api", });


  app.use(router.routes()).use(router.allowedMethods());
};