"use strict";

const state = {
  unusableCharacterIncludesErrorDisplayDecision: true,
  requiredCharacterNotContainsErrorMessage: "",
};

const getters = {
  unusableCharacterIncludesErrorDisplayDecision: (state) => state.unusableCharacterIncludesErrorDisplayDecision,
  requiredCharacterNotContainsErrorMessage: (state) => state.requiredCharacterNotContainsErrorMessage,
};

const mutations = {
  updateUnusableCharacterIncludesErrorDisplayDecision(state, value) {
    state.unusableCharacterIncludesErrorDisplayDecision = true;
    const reg = new RegExp(/^[0-9a-zA-Z]+$/);
    state.unusableCharacterIncludesErrorDisplayDecision = reg.test(value);
  },
  updateRequiredCharacterNotContainsErrorMessage(state, value) {
    state.requiredCharacterNotContainsErrorMessage = "";

    const halfWidthAlphabetUpperCaseLettersReg = new RegExp(/[A-Z]/);
    const halfWidthAlphabetLowerCaseLettersReg = new RegExp(/[a-z]/);
    const halfWidthNumberReg = new RegExp(/[0-9]/);

    const halfWidthAlphabetUpperCaseLettersBoolean = halfWidthAlphabetUpperCaseLettersReg.test(value);
    const halfWidthAlphabetLowerCaseLettersBoolean = halfWidthAlphabetLowerCaseLettersReg.test(value);
    const halfWidthNumberBoolean = halfWidthNumberReg.test(value);

    const createHalfWidthAlphabetUpperCaseLettersErrorMessage = () => {
      return halfWidthAlphabetUpperCaseLettersBoolean ? "" : "半角英字(大文字)";
    };
    const createHalfWidthAlphabetLowerCaseLettersErrorMessage = () => {
      return halfWidthAlphabetLowerCaseLettersBoolean ? "" : "半角英字(小文字)";
    };
    const createHalfWidthNumberErrorMessage = () => {
      return halfWidthNumberBoolean ? "" : "半角数字";
    };

    if (!halfWidthAlphabetUpperCaseLettersBoolean || !halfWidthAlphabetLowerCaseLettersBoolean || !halfWidthNumberBoolean) {
      state.requiredCharacterNotContainsErrorMessage = `${createHalfWidthAlphabetUpperCaseLettersErrorMessage()}と${createHalfWidthAlphabetLowerCaseLettersErrorMessage()}と${createHalfWidthNumberErrorMessage()}が使用されていません`;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
