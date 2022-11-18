class StringRouter {
  constructor(model) {
    this.model = model;
  }

  match = function(mask) {
    return ((mask === "*") || (mask === this.model));
  }
}

class UrlRouter extends StringRouter{
  constructor(url) {
    super(url);
  }
}

class MethodRouter extends StringRouter {
  constructor(method) {
    super(method);
  }
}

export const urlRouterFactory = (url) => new UrlRouter(url);
export const methodRouterFactory = (url) => new MethodRouter(url);