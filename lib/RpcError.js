class JsonRpcError extends Error {
  constructor (message, code, data) {
    super();

    this.message = message;
    this.code = code;

    if (typeof data !== 'undefined') {
      this.data = data;
    }
  }
}

class ParseError extends JsonRpcError {
  constructor () {
    super('Parse error', -32700);
  }
}

class InvalidRequest extends JsonRpcError {
  constructor () {
    super('Invalid Request', -32600);
  }
}

class MethodNotFound extends JsonRpcError {
  constructor () {
    super('Method not found', -32601);
  }
}

class InvalidParams extends JsonRpcError {
  constructor (err) {
    super(err.message, -32602, err.stack);
  }
}

class InternalError extends JsonRpcError {
  constructor (err) {
    let message = err.message;
    if (!message) {
      message = 'Internal error';
    }
    super(message, -32603, err.stack);
  }
}
class Unauthorized extends JsonRpcError {
  constructor () {
    super('Unauthorized', -32604);
  }
}

class ServerError extends JsonRpcError {
  constructor (message, code) {
    if (code < -32099 || code > -32000) {
      throw new Error('Invalid error code');
    }
    super(message, code);
  }
}

module.exports = (...args) => new JsonRpcError(...args);
module.exports = Object.assign(module.exports, {
  ParseError: (...args) => new ParseError(...args),
  InvalidRequest: (...args) => new InvalidRequest(...args),
  MethodNotFound: (...args) => new MethodNotFound(...args),
  InvalidParams: (...args) => new InvalidParams(...args),
  InternalError: (...args) => new InternalError(...args),
  ServerError: (...args) => new ServerError(...args),
  Unauthorized: (...args) => new Unauthorized(...args)
});
