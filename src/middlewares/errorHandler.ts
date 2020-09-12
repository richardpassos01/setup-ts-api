import { Request, Response } from 'express';

import errorHelper from '../common/errors/error-helper';
import ErrorInterface from '../common/errors/ErrorInterface';

const errorHandler = (err: ErrorInterface, req: Request, res: Response): void => {
  let error = err;

  if (!err.statusCode) {
    error = errorHelper.generic.internalServerError();
  }

  res.status(err.statusCode).send({
    customError: error,
  });
};

export default errorHandler;
