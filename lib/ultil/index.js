export const passwordStrength = (password) => {
  const hasMultiCaseAndNumber = password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/);
  console.log(hasMultiCaseAndNumber)
  const hasSpecialCharacter = password.match(/[^A-Za-z0-9]/);
  let streng = password.length > 0 ? 100 : 25
  streng = hasMultiCaseAndNumber ? streng  : (streng - 25)
  streng = hasSpecialCharacter ? streng : (streng - 25)
  streng = password.length > 6 ? streng : (streng - 25)
  streng = streng < 50 ? 25 : streng
  return streng;
};
