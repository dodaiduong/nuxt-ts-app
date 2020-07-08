export const passwordStrength = (password) => {
  const hasMultiCaseAndNumber = password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/);
  const hasSpecialCharacter = password.match(/[^A-Za-z0-9]/);
  if (!hasMultiCaseAndNumber || !hasSpecialCharacter) return true;
  return false;
};
