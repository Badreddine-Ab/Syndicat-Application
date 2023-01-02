export class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}

export const badRequest = (message: string) =>
  new HttpError(400, message);

export const unauthorized = (message: string) =>
  new HttpError(401, message);

export const forbidden = (message: string) =>
  new HttpError(403, message);

export const notFound = (message: string) =>
  new HttpError(404, message);

export const conflict = (message: string) =>
  new HttpError(409, message);

export const internalServerError = (message: string) =>
  new HttpError(500, message);
