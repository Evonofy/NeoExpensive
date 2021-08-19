export interface HttpResponse {
  statusCode: number;
  body: any;
}

export function ok<T>(DTO: T): HttpResponse {
  return {
    statusCode: 200,
    body: DTO
  };
}

export function created<T>(DTO: T): HttpResponse {
  return {
    statusCode: 200,
    body: DTO
  };
}

export function clientError(error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: {
      error: error.message
    }
  };
}

export function unauthorized(error: Error): HttpResponse {
  return {
    statusCode: 401,
    body: {
      error: error.message
    }
  };
}

export function forbidden(error: Error): HttpResponse {
  return {
    statusCode: 403,
    body: {
      error: error.message
    }
  };
}

export function notFound(error: Error): HttpResponse {
  return {
    statusCode: 404,
    body: {
      error: error.message
    }
  };
}

export function conflict(error: Error): HttpResponse {
  return {
    statusCode: 409,
    body: {
      error: error.message
    }
  };
}

export function tooMany(error: Error): HttpResponse {
  return {
    statusCode: 429,
    body: {
      error: error.message
    }
  };
}

export function fail(error: Error) {
  console.log(error);

  return {
    statusCode: 500,
    body: {
      error: error.message
    }
  };
}
