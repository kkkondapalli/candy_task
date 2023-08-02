import { ValidationError } from '@nestjs/class-validator';
import { UnprocessableEntityException } from '@nestjs/common';

export default class ValidationFactory {
  static generate(errors: ValidationError[]) {
    const errorObject = {};
    errors.map((err: ValidationError) => {
      // here the order in which the class validation is added is important
      // the item closest to the property will be the first item in the error bag
      // we can remove the length constraints here [0] to list all the errors, but it's not worthy
      errorObject[err.property] = Object.values(err.constraints)[0];
    });

    return new UnprocessableEntityException(errorObject);
  }
}
