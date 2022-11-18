class RequestExtractor {
  constructor(req) {
    this.req = req;
  }

  get method() {
    return this.req.method;
  }
  
  get url() {
    return this.req.url;
  }
}

export default function requestUtils(req) {
  return new RequestExtractor(req);
}