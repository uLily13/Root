import React from "react";
import Cookies from "js-cookie"
const getInitialLogin = (_) => {
  if (typeof window !== "undefined") {
    const storedPrefs = Cookies.get("_01esBe3");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: false)");
    if (userMedia.matches) {
      return "false";
    }
  }
  return "false";
};
const getInitialLanguage = (_) => {
  if (typeof window !== "undefined") {
    const storedPrefs = Cookies.get("language");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: eng)");
    if (userMedia.matches) {
      return "eng";
    }
  }
  return "eng";
};
export const LoginContext = React.createContext();
export const LanguageContext = React.createContext();
export const LanguageProvider = ({ initialLanguage, children }) => {
  const [language, setLanguage] = React.useState(getInitialLanguage);

  const rawSetLanguage = (lng) => {
    const root = window.document.documentElement;
    const isEnglish = lng === "mn";

    root.classList.remove(isEnglish ? "mn" : "eng");
    root.classList.add(lng);

    Cookies.set("language", lng);
  };
  if (initialLanguage) {
    rawSetLanguage(initialLanguage);
  }
  React.useEffect(
    (_) => {
      rawSetLanguage(language);
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
export const LoginProvider = ({ initialLogin, children }) => {
  const [login, setLogin] = React.useState(getInitialLogin);
  const rawSetLogin = (lgn) => {
    const root = window.document.documentElement;
    const isLogin = lgn === "true";
    root.classList.remove(isLogin ? "false" : "true");
    root.classList.add(lgn);
    Cookies.set("_01esBe3", lgn);
  };

  if (initialLogin) {
    rawSetLogin(initialLogin);
  }

  React.useEffect(
    (_) => {
      rawSetLogin(login);
    },
    [login]
  );

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
