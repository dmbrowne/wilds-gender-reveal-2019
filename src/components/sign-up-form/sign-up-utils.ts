export const validateDisplayName = (value: string) => {
  return !value ? 'required!' : false
}
export const validatePassword = (value: string) => !value ? 'required!' : false;

export const validateEmail = (value: string) => {
  const w3CEmailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  if (!value) {
    return 'required!';
  }
  if (!w3CEmailRegex.test(value)) {
    return 'Email address is not valid';
  }
  return false;
}