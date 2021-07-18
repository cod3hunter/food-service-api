import { ValidationError, ValidatorOptions } from 'class-validator';

export interface ValidationPipeOption extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}
