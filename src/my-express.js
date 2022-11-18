import http from "http";
import requestUtils from "./request-utils.js";
import responseUtils from "./response-utils.js";
import { urlRouterFactory, methodRouterFactory } from "./router.js";

let orderControl = 0;
const app = {};
const middlewares = new Map();

function getMiddlewares(reqUtils) {
  const result = [];
  const methodRouter = methodRouterFactory(reqUtils.extractor.method);
  const urlRouter = urlRouterFactory(reqUtils.extractor.url);
  for (const [methodKey, methodValue] of middlewares) {
    if (methodRouter.match(methodKey)) {
      for (const [urlKey, urlValue] of methodValue) {
        if (urlRouter.match(urlKey)) {
          result.push(...urlValue);
        }
      }
    }
  }
  result.sort((a, b) => a.order - b.order);
  return result.map(f => f.middleware);
}

const getOrder = () => orderControl++;

function appendMiddleware(methodFilter, urlFilter, fn, order) {
  if (middlewares.has(methodFilter)) {
    const urls = middlewares.get(methodFilter);
    if (urls.has(urlFilter)) {
      const newUrls = urls.get(urlFilter);
      newUrls.push({
        middleware: fn,
        order
      });
    }
    else {
      urls.set(urlFilter, [{
        middleware: fn,
        order
      }]);
    }
    middlewares.set(urlFilter, urls);
  }
  else {
    const urls = new Map();
    urls.set(urlFilter, [{
      middleware: fn,
      order
    }]);
    middlewares.set(methodFilter, urls);
  }
}

function extractURLArguments(methodFilter) {
  let urlFilter = "*";
  for (let i = 1; i < arguments.length; i++) {
    const currentArg = arguments[i];
    if (typeof currentArg === "function") {
      appendMiddleware(methodFilter, urlFilter, currentArg, getOrder())
    }
    else {
      if (typeof currentArg === "string") {
        urlFilter = currentArg;
      }
    }
  }
}

app.listen = function() {
  const server = http.createServer((req, res) => this.execute(req, res, 0));
  
  return server.listen.apply(server, arguments);
}

app.use = function() {
  extractURLArguments("*", ...arguments);
}

app.get = function() {
  extractURLArguments("GET", ...arguments);
}

app.post = function() {
  extractURLArguments("POST", ...arguments);
}

app.put = function() {
  extractURLArguments("PUT", ...arguments);
}

app.delete = function() {
  extractURLArguments("DELETE", ...arguments);
}

app.options = function() {
  extractURLArguments("OPTIONS", ...arguments);
}

app.head = function() {
  extractURLArguments("HEAD", ...arguments);
}

app.execute = function(req, res, index) {
  const reqUtils = requestUtils(req);
  const resUtils = responseUtils(res);
  if (index === 0) {
    reqUtils.enhance.enhance();
    resUtils.enhance.enhance();
  }
  const applyMiddlewares = getMiddlewares(reqUtils);
  if ((applyMiddlewares) && (applyMiddlewares[index])) {
    applyMiddlewares[index](req, res, () => this.execute(req, res, index+1));
  }
}

export default () => app;


