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

  get ip() {
    return this.req.headers['x-forwarded-for'] || this.req.socket.remoteAddress;
  }
}

export default function requestUtils(req) {
  return new RequestExtractor(req);
}