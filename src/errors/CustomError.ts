interface CustomError {
  statusCode: number;
}

class CustomError extends Error {
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (message: string, statusCode: number) => {
  return new CustomError(message, statusCode);
};

export  {createCustomError, CustomError};
