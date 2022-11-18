class ResponseEnhance {
  constructor(res) {
    this.res = res;
  }

  enhance = () => {
    this.res.finished = false;
    this.res.status = (httpStatus) => {
      if (!this.res.headersSent) {
        this.res.writeHead(httpStatus);
      }
      return this.res;
    }
    this.res.send = (message) => {
      if (!this.res.writableEnded) {
        this.res.end(message, "utf-8");
      }
    }
  }
}

export default function responseUtils(res) {
  return {
    enhance: new ResponseEnhance(res)
  }
}