export const validatePassword = (pwd: string): boolean => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{1,8}$/;
  return regex.test(pwd);
};
