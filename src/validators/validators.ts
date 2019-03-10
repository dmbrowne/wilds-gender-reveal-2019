import * as ERROR from './constants';

type ValidatorArguments = [string, { [key: string]: string }];
type Validator = (
  value: string,
  allValues: { [key: string]: string }
) => void | string;

export function composeValidators(...validators: Validator[]) {
  return (...args: ValidatorArguments) => {
    return validators.reduce((error, validator: Validator) => error || validator(...args) as any, undefined);
  }
}

export function runIfTruthy(cb: Validator, falseyReturn?: any) {
  return (value: string, ...args: [{ [key: string]: string }]) => {
    if (!!value) {
      return cb(value, ...args);
    }
    return falseyReturn;
  };
}

export const required = (value: string): string | void => {
  if (!value) {
    return ERROR.REQUIRED;
  }
};

export const email = runIfTruthy((value: string): string | void => {
  // w3 standard. https://www.w3.org/TR/2012/WD-html-markup-20120320/input.email.html
  const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const re = new RegExp(regex);
  if (!value.match(re)) {
    return ERROR.INVALID_EMAIL;
  }
}, undefined);

export const comparePassword = runIfTruthy(
  (value: string, { password }: any): string | void => {
    if (!!value && password !== value) {
      return ERROR.PASSWORD_MISMATCH;
    }
  },
);

export const minLength = (requiredMinLength: number) => runIfTruthy((value: string) => {
  if (value.length < requiredMinLength) {
    return `${requiredMinLength} characters required`;
  }
})