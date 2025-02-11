import { ZodError, ZodIssue } from 'zod';
import { TErrorSource, TGenericErrResponse } from '../interface/error';

export const handleZodError = (err: ZodError): TGenericErrResponse => {
  const statusCode = 400;

  const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};
