const Router = require("@koa/router");
const validate = require("./_validation.js");


module.exports = (app) => {
  const router = new Router({ prefix: "/message" });

  router.post("/", validate(postMessage.validationScheme), postMessage);

  app.use(router.routes()).use(router.allowedMethods());
};
