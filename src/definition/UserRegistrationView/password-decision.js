"use strict";

const passwordWithUserNameNotMatchIsDecision = (userName, password) => {
  return userName === password ? false : true;
};

const passwordWithEmailNotMatchIsDecision = (email, password) => {
  return email === password ? false : true;
};

const unusableCharacterIncludesErrorDisplayDecision = (password) => {
  return new RegExp(/^[0-9a-zA-Z]+$/).test(password);
};

const requiredCharacterNotContainsErrorMessageArray = (password) => {
  const errorMessageArray = [];

  const halfWidthAlphabetUpperCaseLettersReg = new RegExp(/[A-Z]/).test(password);
  const halfWidthAlphabetLowerCaseLettersReg = new RegExp(/[a-z]/).test(password);
  const halfWidthNumberReg = new RegExp(/[0-9]/).test(password);

  if (!halfWidthAlphabetUpperCaseLettersReg) {
    errorMessageArray.push("半角英字(大文字)");
  }
  if (!halfWidthAlphabetLowerCaseLettersReg) {
    errorMessageArray.push("半角英字(小文字)");
  }
  if (!halfWidthNumberReg) {
    errorMessageArray.push("半角数字");
  }

  /* UserRegistration.vueでeveryメソッドを使ってパスワードの判定するので、問題がなければtrueをreturnしています */
  return !halfWidthAlphabetUpperCaseLettersReg || !halfWidthAlphabetLowerCaseLettersReg || !halfWidthNumberReg ? errorMessageArray : true;
};

export default {
  passwordWithEmailNotMatchIsDecision,
  passwordWithUserNameNotMatchIsDecision,
  unusableCharacterIncludesErrorDisplayDecision,
  requiredCharacterNotContainsErrorMessageArray,
};
