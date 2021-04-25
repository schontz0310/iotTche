import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErros(err: ValidationError): Errors {
  const validationErros: Errors = {};

  if (err.inner.length > 0) {
    err.inner.forEach(error => {
      validationErros[error.path] = error.message;
    });
  }

  return validationErros;
}
