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

class RequestEnhancement {
  constructor(req) {
    this.req = req;
    this.extractor = new RequestExtractor(req);
  }

  enhance = () => {
    this.req.ip = this.extractor.ip;
  }
}

export default function requestUtils(req) {
  return {
    extractor: new RequestExtractor(req),
    enhance: new RequestEnhancement(req)
  }
}