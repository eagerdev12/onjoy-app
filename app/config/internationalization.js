import React from "react";
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";

import { I18nManager } from "react-native";
import RNRestart from "react-native-restart"; // Import package from node modules

const translationGetters = {
  en: () => require("../lang/en"),
  ar: () => require("../lang/ar")
};
const rtlLanguages = [
  "ar",
  "arc",
  "dv",
  "fa",
  "ha",
  "he",
  "khw",
  "ks",
  "ku",
  "ps",
  "ur",
  "yi"
];
const translate = (key, config) => {
  let msg = i18n.t(key, config);
  // console.log("msg: " + msg);
  if (missingTranslationRegex.test(msg)) {
    // console.log("yeah missing ");
    msg = i18n.t(key, "en");
  }
  return msg;
};
const missingTranslationRegex = /^\[missing ".*" translation\]$/;

const fallback = { languageTag: "en", isRTL: false };

const setI18nConfig = () => {
  // fallback if no available language fits
  i18n.fallbacks = true;
  i18n.translations = translationGetters;
  i18n.defaultLocale = "en";
  const currentLang = RNLocalize.findBestAvailableLanguage(
    Object.keys(translationGetters)
  );
  // console.log('currentLang: ', currentLang)
  const { languageTag, isRTL } = currentLang || fallback;
  // // clear translation cache
  //translate.cache.clear();
  // update layout direction
  if (currentLang.languageTag === "ar" && currentLang.isRTL !== true) {
    I18nManager.forceRTL(true);
    // console.log("vvvvvv");

    // console.log(currentLang.isRTL);
    // console.log(currentLang.languageTag);
    // console.log("vvvvvv");

    setTimeout(function() {
      RNRestart.Restart();
    }, 50);
  }
  if (currentLang.languageTag === "en" && currentLang.isRTL === true) {
    I18nManager.forceRTL(false);
    setTimeout(function() {
      RNRestart.Restart();
    }, 50);
  }
};

const setLocale = (locale = "ar") => {
  i18n.locale = locale;
  let translations = null;
  if (translationGetters[locale]) {
    translations = translationGetters[locale]();
  }
  // console.log("translations: ", translations);
  i18n.translations = { [locale]: translations || fallback };

  if (locale === "ar" && I18nManager.isRTL !== true) {
    I18nManager.forceRTL(true);
    // console.log("vvvvvv");

    // console.log(I18nManager.isRTL);
    // console.log(locale);
    // console.log("vvvvvv");

    setTimeout(function() {
      // console.log(I18nManager.isRTL);
      // console.log(locale);
      RNRestart.Restart();
    }, 50);
  }
  if (locale === "en" && I18nManager.isRTL === true) {
    I18nManager.forceRTL(false);
    setTimeout(function() {
      // console.log(I18nManager.isRTL);
      // console.log(locale);
      RNRestart.Restart();
    }, 50);
  }
};

const getCurrentLocale = () => {
  return i18n.locale;
};

const setDefaultLocale = (locale = "en") => {
  i18n.defaultLocale = locale;
};

const enableFallbacks = () => {
  i18n.fallbacks = true;
};

const getLocales = async () => {
  return await RNLocalize.getLocales();
};

const isRTL = () => {
  //   const currLocale = i18n.locale;
  //   const item = RNLocalize.getLocales().find(
  //     item => item.languageTag === i18n.locale
  //   );
  //   let isRTL = false;
  //   if (item && item.hasOwnProperty("isRTL")) {
  //     isRTL = item.isRTL;
  //   } else {
  //     isRTL = rtlLanguages.includes(currLocale);
  //   }
  return I18nManager.isRTL;
};

export default {
  enableFallbacks,
  setDefaultLocale,
  getCurrentLocale,
  setLocale,
  setI18nConfig,
  translate,
  getLocales,
  isRTL
};
